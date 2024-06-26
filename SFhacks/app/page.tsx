import Image from "next/image";
import Link from "next/link";
import { GiBookmark, GiBookmarklet, GiHood } from "react-icons/gi";

export default function Home() {
  return (
    <main className="flex flex-row h-full">
      <div className="w-1/4 h-full">
        <div className="h-1/2"></div>
        <div className="flex flex-col" style={{ transform: "translateX(40%)" }}>
          <Link href="/NewStory">
            <span className="hidden md:flex flex-row items-center text-black text-3xl mb-8 hover:bg-gray-400 rounded-lg p-2">
              <GiBookmark className="mr-2" />
              <p>New Story</p>
            </span>
          </Link>
          <Link href="/ContinueStory">
            <span className="hidden md:flex flex-row items-center text-black text-3xl mb-8 hover:bg-gray-400 rounded-lg p-2">
              <GiBookmarklet className="mr-2" />
              <p>Continue Story</p>
            </span>
          </Link>
          <Link href="/Characters">
            <span className="hidden md:flex flex-row items-center text-black text-3xl mb-8 hover:bg-gray-400 rounded-lg p-2">
              <GiHood className="mr-2" />
              <p>Characters</p>
            </span>
          </Link>
          <Link href="/Settings" style={{ transform: "translateX(160px)" }}>
            <span className="hidden md:flex flex-row items-center text-black text-base mb-8 hover:bg-gray-400 rounded-lg p-2">
              <p>{"For Parents >>"}</p>
            </span>
          </Link>
        </div>
      </div>
      <div
        className="relative h-full w-3/4 flex justify-center items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover", // Stretch the background image to fit the size of the screen
          backgroundPosition: "center", // Center the background image
          overflow: "hidden", // Hide overflow to ensure the background image covers the entire viewport
          maskImage:
            "radial-gradient(circle at right 50%, rgba(0, 0, 0, 1.0) 60%, transparent 90%)",
          // "linear-gradient(to left, rgba(0, 0, 0, 1.0) 65%, transparent 100%)",
          maskRepeat: "no-repeat",
          maskSize: "contain",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <h1
            className="text-5xl font-bold text-white"
            style={{ transform: "translateY(170px)" }}
          >
            :: storycraft ::
          </h1>
          <h2
            className="text-l font-bold text-white mt-5"
            style={{ transform: "translateY(160px)" }}
          >
            What will your story be?
          </h2>
        </div>
      </div>
    </main>
  );
}
