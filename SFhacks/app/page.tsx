import Image from "next/image";
import Link from 'next/link';


export default function Home() {
  return (
    // create a basic home page
    <main >
      <div className="w-1/3 h-1 ">
        <Link href="/NewStory"></Link>
        <Link href="/ContinueStory"></Link>
        <Link href="/Characters"></Link>
      </div>
      <div className="w-2/3 h-1 opacity-25">
        <Image src="" alt="Picture of Book"></Image>
        <h1> Your Story </h1>
      </div>
    </main>
  );
}
