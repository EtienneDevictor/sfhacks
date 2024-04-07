import Link from "next/link";
import Image from "next/image";
import { fetchStories } from "../data/neurelo";

export default async function Stories() {
    const { data, error } = await fetchStories();
        

    return (
        <main className="w-full h-full flex flex-col justify-center">
            <Link href="/" className="absolute top-4 left-4 text-black px-4">
                {"<< Home"}
            </Link>
            <h2 className="self-center text-3xl mb-10">:: Your Stories ::</h2>
            <div className="mx-20 flex flex-nowrap overflow-x-auto gap-4 self-center items-center">
                {data.map((story) => (
                    <div key={story.title} className="min-w-[275px] h-[475px] text-center flex flex-col justify-between border-dotted border-2 border-black">
                        <Link href={`/Characters/Creator?name=${encodeURIComponent(story.title || "failed to load")}`} passHref> {/* Change this link to the story page */}
                                <Image
                                    className="h-[155%]"
                                    src={story.image_source || "/fairy_placeholder.png"}
                                    alt={story.title || "failed"}
                                    width={275}
                                    height={475}
                                    objectFit="cover"
                                />
                        </Link>
                        <div>
                            <div className="text-black">...............................................</div>
                            <p className="text-lg text-black font-bold pt-2">:: {story.title} ::</p>
                            <div className="text-black">...............................................</div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
