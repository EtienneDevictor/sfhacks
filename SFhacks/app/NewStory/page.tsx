"use server";

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Avatar,
  Story,
  Node,
  StoryApiService,
  StoryCreateInput,
  NodeApiService,
  NodeCreateInput,
  Message,
} from "neurelo-sdk";
import { ObjectId } from "bson";
import {
  fetchAvatars,
  fetchContentRestrictions,
  fetchGlobal,
  fetchReadingLevel,
  getSignedUploadUrl,
  updateContentRestrictions,
} from "../data/neurelo";
import {
  promptMixtral,
  promptMixtralChain,
  promptSDXL,
} from "../data/fireworks";

export default async function ReceiverPage() {
  const generateStory = async () => {};
  const { data, error } = await fetchAvatars();
  const avatars = data;
  const reading_level = await fetchReadingLevel();
  const placeholder = await promptMixtral(
    `Generate an idea for a fantasy story, make sure it's at a ${reading_level} reading level`,
    "Write your story here...",
    true,
  );
  const createStartingNode = async (formData: FormData) => {
    "use server";
    const story: Story = {
      id: new ObjectId().toHexString(),
      title: "Title",
      image_source: "/fairy_placeholder.png",
      starting_node: "please fill this in",
      avatars: [],
    };
    for (const avatar of avatars) {
      if (formData.get(avatar.id || "failed")) {
        story.avatars?.push(avatar.id || "failed");
      }
    }

    const startingNode: Node = {
      id: new ObjectId().toHexString(),
      prompt: {
        role: "system",
        content: `I want you to tell me a story without brutal violence or drugs, about the following prompt:
${formData.get("prompt")}. This story will have the following characters: ${story.avatars
          ?.map((avatar) => JSON.stringify(avatar))
          .join(
            ", ",
          )}. You will guide the story's path, and keep the plot flowing, introducing new conflicts or decisions. At each
suitable conflict point you should stop and let the user respond. The language should be suitable for a ${await fetchReadingLevel()} reader. If the story stops being appropriate for the level, please give an option to end the story.
Always return 2 paragraphs, one with the continued story and one with the options for the user.`,
      },
      user_input: {
        role: "user",
        content: "Please begin the story for me.",
      },
      image_source: "fairy_placeholder.png",
      parent_node: new ObjectId().toHexString(),
      children: [],
    };
    story.starting_node = startingNode.id;

    var firstStoryNode: Node = {
      id: new ObjectId().toHexString(),
      user_input: {
        role: "user",
        content: "",
      },
      image_source:
        "https://plus.unsplash.com/premium_photo-1664970900224-6c67df73191a?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ||
        (await promptSDXL(
          (formData.get("prompt") as string) ||
            "Generate a generic fantasy image",
        )),
      parent_node: startingNode.id || "failed",
      children: [],
    };

    startingNode.children?.push(firstStoryNode.id || "failed");
    const messages = [
      startingNode.prompt,
      startingNode.user_input,
    ] as Message[];
    await promptMixtralChain(messages);
    firstStoryNode.prompt = messages[messages.length - 1];

    const base64 = await promptSDXL(
      `Generate an image for this story: ${firstStoryNode.prompt?.content}`,
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
    const filepath = `${firstStoryNode.id}.png`;
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

    firstStoryNode.image_source = `https://sfhacksbucketstoryteller.s3.us-west-1.amazonaws.com/${filepath}`;

    const storyPromise = StoryApiService.createOneStory(
      story as StoryCreateInput,
    );
    await storyPromise;
    const startingNodePromise = NodeApiService.createOneNode(
      startingNode as NodeCreateInput,
      {
        $scalars: true,
        prompt: true,
        user_input: true,
      },
    );
    await startingNodePromise;

    console.log({ firstStoryNode: firstStoryNode });
    const firstStoryNodePromise = NodeApiService.createOneNode(
      firstStoryNode as NodeCreateInput,
      {
        $scalars: true,
        prompt: true,
        user_input: true,
      },
    );
    await firstStoryNodePromise;

    redirect(`/StoryNode/${story.id}/${firstStoryNode.id}`);
  };

  return (
    <div className="w-full">
      <Link className="absolute top-4 left-4 text-black px-4 py-2" href="/">
        {"<< Home"}
      </Link>
      <form action={createStartingNode}>
        <div className="flex flex-col w-full items-center align-center">
          <div className="flex flex-row gap-4 w-full my-20 align-start justify-center">
            <div className="w-2/3 pl-20 flex-col">
              <h1 className="w-full text-3xl text-center m-4">
                What do you want your story to be about?
                <br />
                :: It can be about <em>anything</em> ::
              </h1>
              <textarea
                className="w-full h-2/3 border-orange-950 border-2 border-dashed rounded-md bg-transparent p-4 bg-gray-200"
                id="prompt"
              >
                {placeholder}
              </textarea>
            </div>
            <div className="flex-col w-1/3 pr-20">
              <div className="text-3xl flex items-center gap-1 my-4">
                <h1 className="text-4xl">::</h1>
                <h1 className="text-center">
                  Who do you want to have in your story?
                </h1>
                <h1 className="text-4xl">::</h1>
              </div>

              <div className="w-full flex flex-col h-full pb-4 justify-end table">
                <div className="border-black border-2 border-dotted rounded-md overflow-hidden mb-4 flex flex-col flex-grow justify-evenly">
                  {avatars.map((avatar) => {
                    return (
                      <div className="hover:bg-orange-950 hover:bg-opacity-10 flex flex-row items-center w-full h-full">
                        <input
                          type="checkbox"
                          id={avatar.id}
                          className="mx-4 h-full min-h-10 table-cell align-middle outline-black outline-1 accent-orange-900"
                        ></input>
                        <label
                          htmlFor={avatar.id}
                          className="h-full w-full table-cell align-middle font-bold"
                        >
                          {avatar.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0 flex"
          >
            {/* <GiOpenGate className="mr-1 translate-y-0.5" /> */} :: Start
            exploring... ::
          </button>
        </div>
      </form>
    </div>
  );
}
