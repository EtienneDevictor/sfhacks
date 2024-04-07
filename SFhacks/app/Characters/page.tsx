import Image from "next/image";
import Link from "next/link";
import { AvatarApiService } from "neurelo-sdk";
import { fetchAvatars } from "../data/neurelo";
import { GiHeartPlus } from "react-icons/gi";

export default async function CharacterSelect() {
  // Sample array of character data

  const { data, error } = await fetchAvatars();
  // const characters = [
  //     {
  //         backstory: "",
  //         pronouns: "she_her",
  //         weaknesses: "Water, Cold",
  //         strengths: "A Noble Heart",
  //         skills: "Flying, Healing Magic",
  //         dislikes: "Mud, Orcs",
  //         likes: "Sunlight, Flowers",
  //         traits: "Kind, Shy, Sensitive",
  //         name: "Freya Thistleburst",
  //         image_source: "https://images.unsplash.com/photo-1634149136748-12fa81337188?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //     },
  //     {
  //         backstory: "",
  //         pronouns: "he_him",
  //         weaknesses: "Trickery",
  //         strengths: "Physical Strength",
  //         skills: "Swordsmanship",
  //         dislikes: "Trickey",
  //         likes: "Knights",
  //         traits: "Bards",
  //         name: "Mathew III",
  //         image_source: "https://images.unsplash.com/photo-1567919946930-d9a47f80fc9d?q=80&w=2810&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //     }
  //     // Add more character objects as needed
  // ];

  return (
    <main className="w-full h-full flex flex-col justify-center">
      <Link className="absolute top-4 left-4 text-black px-4" href="/">
        {"<< Home"}
      </Link>
      <h2 className="self-center text-3xl mb-10">:: Your Characters ::</h2>
      <div className="mx-20 flex flex-nowrap overflow-x-auto gap-4 self-center items-center">
        {data.map((character) => (
          <Link
            key={character.name}
            className="border-dotted border-2 border-black min-w-[275px] h-[475px] text-center flex flex-col justify-between"
            href={`/Characters/Creator?name=${encodeURIComponent(character.name || "failed to load")}`}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ height: "95%" }}
            >
              <Image
                src={character.image_source || "/fairy_placeholder.png"}
                alt={character.name || "failed"}
                layout="fill"
                objectFit="cover"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 80%, transparent 100%)",
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                }}
              />
            </div>
            <div>
              <div className="text-black">
                ...............................................
              </div>
              <p className="text-2xl text-black font-bold pt-2">
                :: {character.name} ::
              </p>
              <div className="text-black">
                ...............................................
              </div>
            </div>
          </Link>
        ))}
        <Link
          className="border-dotted border-2 border-black min-w-[275px] h-[475px] text-center flex flex-col justify-center hover:bg-gray-400 align-middle items-center"
          href="/Characters/Creator"
        >
          <div style={{ transform: "translateY(-65%)" }}>
            <div className="text-black">
              ...............................................
            </div>
            <p className="text-xl text-black font-bold pt-2">
              :: Create A Character ::
            </p>
            <div className="text-black">
              ...............................................
            </div>
          </div>
          <GiHeartPlus size={100} className="translate-y-8" />
        </Link>
      </div>
    </main>
  );
}
