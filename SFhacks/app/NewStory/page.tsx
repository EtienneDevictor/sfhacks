"use server";

import Link from "next/link";
import { Avatar, Story, Node } from "neurelo-sdk";
import { ObjectId } from "bson";
import { fetchAvatars, fetchGlobal, fetchReadingLevel } from "../data/neurelo";
import { promptMixtral } from "../data/fireworks";

export default async function ReceiverPage() {
  const generateStory = async () => {};
  const { data, error } = await fetchAvatars();
  const avatars = data;
  const reading_level = fetchGlobal();
  const placeholder = await promptMixtral(
    `Generate an idea for a fantasy story, make sure it's at a ${reading_level} reading level`,
    "Write your story here...",
    true,
  );
  const createStartingNode = async (formData: FormData) => {
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
        content: `I am [Character Name] ([Pronouns]), a [Description of Character]. I want you to tell me a story
without [restrictions], about the following prompt: ${formData.get("prompt")}. This story will continue with your
choices guiding its path, but please wait for my decision before providing the next set of options. Keep the plot
flowing, introducing new conflicts or decisions. The language should be suitable for a ${await fetchReadingLevel()}
reader. I want you to return this in a JSON format of {story: "story-string-here", options: ["option 1", "option 2",
"option 3"]}.`,
      },
    };
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
                        />
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
          <input
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0 flex"
          >
            {/* <GiOpenGate className="mr-1 translate-y-0.5" /> */} :: Start
            exploring... ::
          </input>
        </div>
      </form>
    </div>
  );
}
