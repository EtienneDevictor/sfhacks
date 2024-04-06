import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { StoryApiService, NodeApiService } from "neurelo-sdk";

// TODO
export default async function Page() {
  const router = useRouter();
  const storyId = router.query.story as string;
  const nodeId = router.query.node as string;
  const story = await StoryApiService.findStoryById(storyId);
  const node = await NodeApiService.findNodeById(nodeId);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // generate a new node with
    const formData = new FormData(event.currentTarget);
    fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
      },
      body: JSON.stringify({
        model: "accounts/fireworks/models/mixtral-8x7b-instruct",
        max_tokens: 4096,
        top_p: 1,
        top_k: 40,
        presence_penalty: 0,
        frequency_penalty: 0,
        temperature: 0.6,
        messages: [],
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

  // NOTE: temp for now:
  const options = ["hi", "2", "3"];
  return (
    <div className="h-full flex flex-row">
      <div className="w-3/4">
        <Image
          // TODO: add image src, maybe modify the gradient as well
          src="/fairy_placeholder.png"
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
        <p className="m-8 h-full overflow-y-clip">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur
        </p>
        <form className="w-3/4 flex flex-col h-full pb-4 justify-end">
          <div className="border-black border-2 border-dotted rounded-md overflow-hidden mb-4 flex flex-col flex-grow justify-evenly">
            {options.map((option, index) => {
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
              onsubmit={}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
