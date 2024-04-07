import Link from "next/link";
import Image from "next/image";
import { fetchStories } from "../data/neurelo";
import { NodeApiService, StoryApiService } from "neurelo-sdk";
import { summarizeNode } from "../data/fireworks";

export default async function Stories() {
  const { data, error } = await fetchStories();

  const nodes = await Promise.all(
    data.map(async (story) => {
      if (story.title === "Title") {
        const node = await NodeApiService.findNodeById(
          story.starting_node || "failed",
          {
            $scalars: true,
            prompt: true,
            user_input: true,
          },
        );
        const res = node.data.data;
        const child = await NodeApiService.findNodeById(
          res.children[0] || "failed",
          {
            $scalars: true,
            prompt: true,
            user_input: true,
          },
        );

        const childRes = child.data.data;
        await StoryApiService.updateStoryById(story.id || "failed", {
          title: await summarizeNode(childRes),
          image_source: childRes.image_source,
        });
      }

      return {
        title: story.title,
        image: story.image_source,
      };
    }),
  );

  return (
    <main className="w-full h-full flex flex-col justify-center">
      <Link href="/" className="absolute top-4 left-4 text-black px-4">
        {"<< Home"}
      </Link>
      <h2 className="self-center text-3xl mb-10">:: Your Stories ::</h2>
      <div className="mx-20 flex flex-nowrap overflow-x-auto gap-4 self-center items-center">
        {nodes.map((node) => (
          <div
            key={node.title}
            className="w-[275px] h-[475px] text-center justify-between border-dotted border-2 border-black overflow-hidden relative"
          >
            <Link
              href={`/Characters/Creator?name=${encodeURIComponent(node.title || "failed to load")}`}
              passHref
            >
              {" "}
              {/* Change this link to the story page */}
              <Image
                fill
                className="h-full w-auto"
                src={node.image || "/fairy_placeholder.png"}
                alt={node.title || "failed"}
                objectFit="cover"
              />
            </Link>
            <div className="absolute bottom-[0%] w-full bg-gradient-to-t from-amber-100 from-80% to-transparent to-100% flex flex-col align-center items-center">
              <div className="text-black">
                ...............................................
              </div>
              <p className="text-lg flex text-black font-bold pt-2 w-[90%]">
                <p>::</p>
                <p className="mx-2"> {node.title} </p>
                <p>::</p>
              </p>
              <div className="text-black">
                ...............................................
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
