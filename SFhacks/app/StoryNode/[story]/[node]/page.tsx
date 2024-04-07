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
import { promptMixtralChain, promptSDXL } from "@/app/data/fireworks";
import { ObjectId } from "bson";
import { getSignedUploadUrl } from "@/app/data/neurelo";

// TODO
export default async function Page({
  params,
}: {
  params: { story: string; node: string };
}) {
  // so we are currently filling out a node that has its prompt already filled in, it needs the user input tho
  const storyId = params.story;
  const nodeId = params.node;
  const story = await StoryApiService.findStoryById(storyId);
  const storyData = story.data.data;
  const currentNode = await NodeApiService.findNodeById(nodeId, {
    $scalars: true,
    prompt: true,
    user_input: true,
  });
  const currentNodeData = currentNode.data.data;
  const currentNodeJSON = JSON.parse(
    currentNodeData.prompt?.content || "failed",
  );

  // gather all past messages
  const messages: Message[] = [];
  var node = await NodeApiService.findNodeById(
    storyData.starting_node || "failed",
    {
      $scalars: true,
      prompt: true,
      user_input: true,
    },
  );
  console.log(node);
  while (
    node.data.data.children !== undefined &&
    node.data.data.children.length > 0
  ) {
    messages.push(
      node.data.data.prompt as Message,
      node.data.data.user_input as Message,
    );
    const nextNodeId = node.data.data.children[0];
    node = await NodeApiService.findNodeById(nextNodeId || "failed", {
      $scalars: true,
      prompt: true,
      user_input: true,
    });
  }
  console.log(messages);
  // process the current prompt into options
  const options =
    JSON.parse(currentNodeData.prompt?.content || "failed").options || "failed";

  const createNextNode = async (formData: FormData) => {
    "use server";
    const user_choice = options[Number(formData.get("option")) || 0];
    messages.push({
      role: "user",
      content: user_choice,
    });
    await promptMixtralChain(messages);
    const newNode: Node = {
      children: [],
      parent_node: currentNodeData.id || "failed",
      id: new ObjectId().toHexString(),
      user_input: {
        role: "user",
        content: options[Number(user_choice)],
      },
      prompt: messages[messages.length - 1],
    };

    const base64 = await promptSDXL(`Generate an image for this story: ${newNode.prompt?.content}`)
    
    // converting Base64 to blob
    function getFileFromBase64(string64:string) {
      const trimmedString = string64.replace('data:image/png;base64', '');
      const imageContent = Buffer.from(trimmedString, 'base64');
      const view = new Uint8Array(imageContent);
    
      const type = 'image/png';

      const blob = new Blob([view], { type });

      return blob
  }

  const imageBlob = getFileFromBase64(base64)
  const filepath = `${newNode.id}.png`
  const presigned = await getSignedUploadUrl(filepath)

  const form_data = new FormData();
  Object.keys(presigned.fields).forEach(key => {
    formData.append(key, presigned.fields[key]);
  });
  // Actual file has to be appended last.
  formData.append("file", imageBlob);

  // sending to s3 bucket 
  await fetch(presigned.url, {
      method: 'POST',
      body:form_data,
      // mode: 'no-cors',
      // headers: {
      //     'Content-Type': 'multipart/form-data'
      // }
  })


    newNode.image_source = filepath

    // create the new node so we can navigate to it
    await NodeApiService.createOneNode(newNode as NodeCreateInput, {
      $scalars: true,
      prompt: true,
      user_input: true,
    });
    // update the old one's children so we can get all the messages
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

  // NOTE: temp for now:
  return (
    <div className="h-full flex flex-row">
      <div className="w-3/4">
        <Image
          // TODO: add image src, maybe modify the gradient as well
          src="https://placekitten.com/200/300"
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
        <p className="m-8 h-full overflow-y-clip">{currentNodeJSON.story}</p>
        <form className="w-3/4 flex flex-col h-full pb-4 justify-end">
          <div className="border-black border-2 border-dotted rounded-md overflow-hidden mb-4 flex flex-col flex-grow justify-evenly">
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
              href=""
              className="px-4 py-2 rounded-full bg-gray-100 text-black shadow-black shadow-sm"
            >
              -- Zoom Out
            </Link>
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0"
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
