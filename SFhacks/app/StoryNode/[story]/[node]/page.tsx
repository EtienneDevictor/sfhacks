import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Message,
  StoryApiService,
  NodeApiService,
  NodeCreateInputPrompt,
  Node,
  NodeCreateInput,
} from "neurelo-sdk";
import {
  promptMixtralChain,
  promptSDXL,
  summarize,
} from "@/app/data/fireworks";
import { ObjectId } from "bson";
import { getSignedUploadUrl } from "@/app/data/neurelo";
import { scanOptions } from "@/app/data/utils";

// TODO
export default async function Page({
  params,
}: {
  params: { story: string; node: string };
}) {
  // so we are currently filling out a node that has its prompt already filled in, it needs the user input tho
  const currentNode = await NodeApiService.findNodeById(params.node, {
    $scalars: true,
    prompt: true,
    user_input: true,
  });
  const currentNodeData = currentNode.data.data;

  // process the current prompt into options to display to the user

  // uses form input to create the next node
  const { options, index } = scanOptions(
    currentNodeData.prompt?.content || "failed",
  );
  const story = currentNodeData.prompt?.content?.substring(0, index - 1);
  const createNextNode = async (formData: FormData) => {
    "use server";
    const storyId = params.story;
    const story = await StoryApiService.findStoryById(storyId);
    const storyData = story.data.data;
    const userFormChoice = {
      role: "user",
      content: options[Number(formData.get("option")) || 0],
    };

    var messages: Message[] = [];
    // gather current prompt and user input into messages
    const currentNode = await NodeApiService.findNodeById(params.node, {
      $scalars: true,
      prompt: true,
      user_input: true,
    });
    // gather all past messages in past nodes
    const currentNodeData = currentNode.data.data;

    var node = await NodeApiService.findNodeById(
      storyData.starting_node || "failed",
      {
        $scalars: true,
        prompt: true,
        user_input: true,
      },
    ).then((res) => res.data.data);

    while (node.id !== currentNodeData.id) {
      messages.push(node.prompt as Message, node.user_input as Message);
      node = await NodeApiService.findNodeById(node.children[0] || "failed", {
        $scalars: true,
        prompt: true,
        user_input: true,
      }).then((res) => res.data.data);
    }
    messages.push(currentNodeData.prompt as Message, userFormChoice);

    //// SUMMARIZATION
    // var previousText = "";
    // while (node.id !== currentNodeData.id) {
    //   node = await NodeApiService.findNodeById(params.node, {
    //     $scalars: true,
    //     prompt: true,
    //     user_input: true,
    //   }).then((res) => res.data.data);
    //   previousText += "Storyteller: " + node.prompt?.content;
    //   previousText += "User: " + node.user_input?.content;
    // }
    //
    // const summary = await summarize(previousText);
    // const messages = [
    //   {
    //     role: "system",
    //     content: `You are an infinite storytelling bot. Continue the story for the user by introducing a conflict or decision for the user to resolve. Respond in the JSON format: { "story": "string-here", options: [ "option1", "option2", "option3" ] }.`,
    //   },
    //   {
    //     role: "user",
    //     content: `This is a summary of what's happened so far: ${summary}. Remember to respond to me in the JSON format: { "story": "string-here", options: [ "option1", "option2", "option3" ] }.`,
    //   },
    // ];
    // console.log({ messages: messages });
    //
    // await promptMixtralChain(messages);
    // const story_continuation = messages[messages.length - 1];

    // gather all past messages in past nodes
    // const node = await NodeApiService.findNodeById(storyData.starting_node, {
    //   $scalars: true,
    //   prompt: true,
    //   user_input: true,
    // }).then((res) => res.data.data);
    // while (node.id !== currentNodeData.id) {
    //   messages.push();
    // }
    //
    // console.log({ currentNode: node });
    //
    // const currentNodeJSON = JSON.parse(
    //   currentNodeData.prompt?.content || "failed",
    // );
    // messages.push({
    //   role: "assistant",
    //   content: currentNodeJSON.story,
    // });
    // messages.push(userFormChoice);

    await promptMixtralChain(messages);
    console.log({ messages: messages });

    // create next node
    const newNode: Node = {
      children: [],
      parent_node: currentNodeData.id || "failed",
      id: new ObjectId().toHexString(),
      user_input: userFormChoice,
      prompt: messages[messages.length - 1],
    };

    const base64 = await promptSDXL(
      `Generate an image for this story: ${newNode.prompt?.content}`,
    );

    // converting Base64 to blob
    function getFileFromBase64(string64: string) {
      const trimmedString = string64.replace("data:image/png;base64", "");
      const imageContent = Buffer.from(trimmedString, "base64");
      const view = new Uint8Array(imageContent);

      const type = "image/png";

      const blob = new Blob([view], { type });

      return blob;
    }

    const imageBlob = getFileFromBase64(base64);
    const filepath = `${newNode.id}.png`;
    const presigned = await getSignedUploadUrl(filepath);

    const form_data = new FormData();
    Object.keys(presigned.fields).forEach((key) => {
      form_data.append(key, presigned.fields[key]);
    });
    // Actual file has to be appended last.
    form_data.append("file", imageBlob);

    // sending to s3 bucket
    await fetch(presigned.url, {
      method: "POST",
      body: form_data,
      // mode: 'no-cors',
      // headers: {
      //     'Content-Type': 'multipart/form-data'
      // }
    });
    console.log(form_data);

    newNode.image_source = `https://sfhacksbucketstoryteller.s3.us-west-1.amazonaws.com/${filepath}`;

    // create the new node so we can navigate to it
    await NodeApiService.createOneNode(newNode as NodeCreateInput, {
      $scalars: true,
      prompt: true,
      user_input: true,
    });
    // update the old one's children so we can get all the messages when we loop through in the future
    await NodeApiService.updateNodeById(
      currentNodeData.id || "failed",
      {
        children: [newNode.id || "failed"],
      },
      {
        $scalars: true,
        prompt: true,
        user_input: true,
      },
    );
    redirect(`/StoryNode/${storyId}/${newNode.id || "failed"}`);
  };

  const story_has_no_choices = options[0].trim() === "";
  // just assume it ends for now

  // NOTE: temp for now:
  return (
    <div className="h-full flex flex-row">
      <div className="w-3/4">
        <Image
          // TODO: add image src, maybe modify the gradient as well
          src={
            currentNodeData.image_source ||
            "https://via.placeholder.com/900x600"
          }
          alt="placeholder"
          className="relative object-cover h-full w-full right-0"
          style={{
            maskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 1.0) 50%, transparent 100%)",
            maskRepeat: "no-repeat",
            maskSize: "contain",
          }}
          width={900}
          height={600}
        />
        <div className="fixed h-full w-full" />
      </div>
      <div className="fixed w-1/3 h-full flex flex-col items-center text-black right-0 justify-between">
        {/* make a form with radio buttons for each option */}
        <p className="m-8 h-full w-[90%] overflow-y-scroll">
          {story_has_no_choices ? currentNodeData.prompt?.content : story}
        </p>
        <form className={`w-3/4 flex flex-col h-full pb-4 justify-end`}>
          <div
            className={`border-black border-2 border-dotted rounded-md overflow-hidden mb-4 flex flex-col flex-grow justify-evenly ${story_has_no_choices ? "hidden appearance-none" : ""}`}
          >
            {options.map((option: any, index: any) => {
              const str = index.toString();
              return (
                <div
                  className="hover:bg-orange-950 hover:bg-opacity-10 flex flex-row items-center w-full h-full table"
                  key={str}
                >
                  <input
                    type="radio"
                    name="option"
                    className="mx-4 h-full table-cell align-middle outline-black outline-1 accent-orange-900"
                    id={str}
                    value={str}
                    key={str}
                  />
                  <label
                    key={str}
                    htmlFor={str}
                    className="h-full w-full table-cell align-middle"
                  >
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row justify-between items-center">
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-gray-100 text-black shadow-black shadow-sm"
            >
              -- Go Home
            </Link>
            <button
              type="submit"
              className={`bg-white text-black px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0 ${story_has_no_choices ? "hidden appearance-none" : ""}`}
              formAction={createNextNode}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
