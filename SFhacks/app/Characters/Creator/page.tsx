'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import { GiTrashCan, GiSaveArrow } from "react-icons/gi";


export default function ReceiverPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
 
    const person = { 
        pronouns: "She/Her",
        weaknesses: "Water, Cold",
        strengths: "A Noble Heart",
        skills: "Flying, Healing Magic",
        dislikes: "Mud, Orcs",
        likes: "Sunlight, Flowers",
        traits: "Kind, Shy, Sensitive",
        name: "Freya Thistleburst",
        image_source: "https://images.unsplash.com/photo-1634149136748-12fa81337188?q=80&w=3087&auto=format&fit=crop&ixlib=rb-3.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    };

    const [pronouns, setPronouns] = useState(person.pronouns);
    const [weaknesses, setWeaknesses] = useState(person.strengths);
    const [skills, setSkills] = useState(person.skills);
    const [dislikes, setDislikes] = useState(person.dislikes);
    const [likes, setLikes] = useState(person.likes);
    const [name, setName] = useState(person.name);
    const [strength, setStrength] = useState(person.strengths);
    const [img_src, setImg_Src] = useState(person.image_source);
    const [description, setDescription] = useState("");

    const imageUrls = [
        '/fairy_placeholder.png',
        '/fairy_placeholder.png',
        '/fairy_placeholder.png',
        '/fairy_placeholder.png'
      ];

    return (
        <div className="w-full">
            <button
                className="absolute top-4 left-4 text-black px-4 py-2"
                onClick={() => router.push('/Characters')}
            >
                {"<< Characters"}
            </button>
            <div className="mx-20 flex gap-4 w-4/5 my-20">
                <div className="w-1/3 flex flex-col" key="image">
                    <label className="text-black text-xl">Character</label>
                    <div key={name} className="border-dotted border-2 border-black min-w-[275px] h-[475px] text-center flex flex-col justify-between" onClick={() => {router.push(`/Characters/Creator?name=${encodeURIComponent(character.name)}`)}}>
                            <div className="relative w-full overflow-hidden" style={{ "height": "95%"}}>
                                <Image src={img_src} alt={name} layout="fill" objectFit="cover" />
                            </div>
                            <div>
                                <div className="text-black">...............................................</div>
                                <p className="text-lg text-black font-bold pt-2"> :: {name} :: </p>
                                <div className="text-black">...............................................</div>
                            </div>
                        </div>
                        <button className="mt-4 text-s self-center bg-white px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0 flex flex-row"><GiSaveArrow className="mr-2" style={{ transform: 'translateY(3px)' }}/> Save Changes</button>
                        <span className="hidden md:flex flex-row items-center text-black text-l mb-8 hover:bg-gray-400 rounded-lg p-2 mt-10 self-center">
                            <GiTrashCan className="" style={{ transform: 'translateY(-3px)' }}/>
                            <p>Characters</p>
                        </span>
                    </div>
                <div key="form" className="flex flex-col w-1/4" >
                    <label className="text-black text-xl">Name</label>
                    <input
                        className="border border-black border-dotted outline-none bg-inherit px-4 py-4 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="text-black text-xl mt-3">Pronoun</label>
                    <input
                        className="border border-black border-dotted outline-none bg-inherit px-4 py-4 w-full"
                        value={pronouns}
                        onChange={(e) => setPronouns(e.target.value)}
                    />
                    <label className="text-black text-xl mt-3">Skills</label>
                    <input
                        className="border border-black border-dotted outline-none bg-inherit px-4 py-4 w-full"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />
                    <label className="text-black text-xl mt-3">Strengths</label>
                    <input
                        className="border border-black border-dotted outline-none bg-inherit px-4 py-4 w-full"
                        value={strength}
                        onChange={(e) => setStrength(e.target.value)}
                    />
                    <label className="text-black text-xl mt-3">Weaknesses</label>
                    <input
                        className="border border-black border-dotted outline-none bg-inherit px-4 py-4 w-full"
                        value={weaknesses}
                        onChange={(e) => setWeaknesses(e.target.value)}
                    />
                    <label className="text-black text-xl mt-3">Likes</label>
                    <input
                        className="border border-black border-dotted outline-none bg-inherit px-4 py-4 w-full"
                        value={likes}
                        onChange={(e) => setLikes(e.target.value)}
                    />
                    <label className="text-black text-xl mt-3">Dislikes</label>
                    <input
                        className="border border-black border-dotted outline-none bg-inherit px-4 py-4 w-full"
                        value={dislikes}
                        onChange={(e) => setDislikes(e.target.value)}
                    />
                    
                </div>
                <div className="flex flex-col w-1/4 h-full" key="Image">
    <label className="text-black text-xl">Images</label>
    <div className="flex flex-wrap items-start">
        <textarea
            className="border border-black border-dotted outline-none bg-inherit px-4 py-4 flex-grow min-h-[100px]"
            placeholder="Describe the appearance of your character"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    </div>
    <div className="grid grid-cols-2 gap-4 mt-5">
        {/* Mapping over the imageUrls array */}
        {imageUrls.map((url, index) => (
            <div key={index} className="border border-gray-400">
                <Image src={url} alt={`Image ${index + 1}`} width={300} height={200} />
            </div>
        ))}
    </div>
    <button className="mt-4 text-s self-end bg-white px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0">Generate Again</button>
</div>



            </div>
        </div>
    );
}
