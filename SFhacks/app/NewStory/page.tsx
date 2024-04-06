import { AvatarApiService, Avatar } from "neurelo-sdk";
export default function ReceiverPage() {
  const person = {
    backstory: "",
    pronouns: "she_her",
    weaknesses: "Water, Cold",
    strengths: "A Noble Heart",
    skills: "Flying, Healing Magic",
    dislikes: "Mud, Orcs",
    likes: "Sunlight, Flowers",
    traits: "Kind, Shy, Sensitive",
    name: "Freya Thistleburst",
    image_source:
      "https://images.unsplash.com/photo-1634149136748-12fa81337188?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <div>
      <button
        className="absolute top-4 left-4 text-black px-4 py-2"
        onClick={() => router.push("/Characters")}
      >
        {"<< Characters"}
      </button>
      <p> {name} </p>
    </div>
  );
}
