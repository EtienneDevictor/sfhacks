import Image from "next/image";
import clientPromise from "./data/mongodb";

export default function Home() {
  return (
    // create a basic home page
    <main>
      <h1>Welcome to the home page</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </main>
  );
}
