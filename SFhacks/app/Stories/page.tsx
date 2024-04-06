"use server";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StoryApiService } from "neurelo-sdk";

export default async function StorySelect() {
  const fetchStories = async () => {
    try {
      const res = await StoryApiService.findStory(undefined);
      console.log(res.data.data);
      return { data: res.data?.data || [], error: undefined };
    } catch (error) {
      return { data: [], error: error };
    }
  };

  var { data, error } = await fetchStories();

  return (
    <main className="w-full h-full flex justify-center">
      <a href="/">
        <button className="absolute top-4 left-4 text-black px-4 py-2">
          {"<< Home"}
        </button>
      </a>
      <div className="mx-20 flex flex-nowrap overflow-x-auto gap-4 items-center">
        {data !== undefined && data.length > 0
          ? data.map((story) => (
              <a
                href={`/Stories/Creator?name=${encodeURIComponent(story.title || "failed")}`}
              >
                <div
                  key={story.title}
                  className="border-dotted border-2 border-black min-w-[275px] h-[475px] text-center flex flex-col justify-between"
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: "95%" }}
                  >
                    <Image
                      src={story.image_source || "/fairy_placeholder.jpg"}
                      alt={story.title || "failed"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <div className="text-black">
                      ...............................................
                    </div>
                    <p className="text-lg text-black font-bold pt-2">
                      {" "}
                      :: {story.title} ::{" "}
                    </p>
                    <div className="text-black">
                      ...............................................
                    </div>
                  </div>
                </div>
              </a>
            ))
          : null}
        {/* <a href="Stories/Creator"> */}
        {/*   <div className="border-dotted border-2 border-black min-w-[275px] h-[475px] text-center flex flex-col justify-center hover:bg-gray-400"> */}
        {/*     <div style={{ transform: "translateY(-65%)" }}> */}
        {/*       <div className="text-black"> */}
        {/*         ............................................... */}
        {/*       </div> */}
        {/*       <p className="text-lg text-black font-bold pt-2"> */}
        {/*         {" "} */}
        {/*         + Create New Story +{" "} */}
        {/*       </p> */}
        {/*       <div className="text-black"> */}
        {/*         ............................................... */}
        {/*       </div> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </a> */}
      </div>
    </main>
  );
}
