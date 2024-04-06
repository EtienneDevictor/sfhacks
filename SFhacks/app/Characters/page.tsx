'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CharacterSelect() {
    const router = useRouter();

    // Sample array of character data
    const characters = [
        { 
            backstory: "",
            pronouns: "she_her",
            weaknesses: "Water, Cold",
            strengths: "A Noble Heart",
            skills: "Flying, Healing Magic",
            dislikes: "Mud, Orcs",
            likes: "Sunlight, Flowers",
            traits: "Kind, Shy, Sensitive",
            name: "Freya Thistleburst",
            image_source: "https://images.unsplash.com/photo-1634149136748-12fa81337188?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        { 
            backstory: "",
            pronouns: "he_him",
            weaknesses: "Trickery",
            strengths: "Physical Strength",
            skills: "Swordsmanship",
            dislikes: "Trickey",
            likes: "Knights",
            traits: "Bards",
            name: "Mathew III",
            image_source: "https://images.unsplash.com/photo-1567919946930-d9a47f80fc9d?q=80&w=2810&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        // Add more character objects as needed
    ];

    return (
        <main className="w-full h-full flex justify-center">
            <button
                className="absolute top-4 left-4 text-black px-4 py-2"
                onClick={() => router.push('/')}
            >
                {"<< Home"}
            </button>
            <div className="mx-20 flex flex-nowrap overflow-x-auto gap-4 items-center">
                {characters.map(character => (
                    <div key={character.name} className="border-dotted border-2 border-black min-w-[275px] h-[475px] text-center flex flex-col justify-between" onClick={() => {router.push(`/Characters/Creator?name=${encodeURIComponent(character.name)}`)}}>
                        <div className="relative w-full overflow-hidden" style={{ "height": "95%"}}>
                            <Image src={character.image_source} alt={character.name} layout="fill" objectFit="cover" />
                        </div>
                        <div>
                            <div className="text-black">...............................................</div>
                            <p className="text-lg text-black font-bold pt-2"> :: {character.name} :: </p>
                            <div className="text-black">...............................................</div>
                        </div>
                    </div>
                ))}
                <div className="border-dotted border-2 border-black min-w-[275px] h-[475px] text-center flex flex-col justify-center hover:bg-gray-400" onClick={() => {router.push(`/Characters/Creator/`)}} >
                    <div style={{ transform: 'translateY(-65%)' }}>
                        <div className="text-black">...............................................</div>
                        <p className="text-lg text-black font-bold pt-2"> + Create New Character +  </p>
                        <div className="text-black">...............................................</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
