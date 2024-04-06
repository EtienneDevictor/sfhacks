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
        image_source: ""
    };

    if (!(searchParams.get('name') === null)) {
        // this is were we fetch the basic info
    } 

    const [pronouns, setPronouns] = useState(person.pronouns);
    const [weaknesses, setWeaknesses] = useState(person.strengths);
    const [skills, setSkills] = useState(person.skills);
    const [dislikes, setDislikes] = useState(person.dislikes);
    const [likes, setLikes] = useState(person.likes);
    const [name, setName] = useState(person.name);
    const [strength, setStrength] = useState(person.strengths);
    const [img_src, setImg_Src] = useState(person.image_source);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const [imageUrl, setImgUrl] = useState("");

    // image generator button 
  const handleGeneration = async () => {
    console.log('clicked');
    const response = await fetch('https://api.fireworks.ai/inference/v1/image_generation/accounts/fireworks/models/stable-diffusion-xl-1024-v1-0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer VZlLjrlTqebChSNFepvks5aJzIxfu5RF1wTNppYHGtphRdkp`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({prompt: description})
      });

    const data = await response.json()
    console.log(data)
    setImgUrl(data[0].base64);
    console.log(imageUrl)
  };

  // select image 
  const selectImage = async () => {
    setImg_Src(imageUrl)
  }

  // save character
  const saveCharacter = async () => {
    if (!(searchParams.get('name') === null)) {
        // create 
        return 
    }
    //update 
  }

    return (
        <div className="w-full">
            <button
                className="absolute top-4 left-4 text-black px-4 py-2"
                onClick={() => router.push('/Characters')}
            >
                {"<< Characters"}
            </button>
            <div className="mx-20 flex gap-4 w-4/5 my-20 justify-center h-full">
                <div className="w-1/3 flex flex-col" key="image">
                    <label className="text-black text-xl">Character</label>
                    <div key={name} className="border-dotted border-2 border-black min-w-[275px] h-[475px] text-center flex flex-col justify-between" onClick={() => {router.push(`/Characters/Creator?name=${encodeURIComponent(character.name)}`)}}>
                            <div className="relative w-full overflow-hidden" style={{ "height": "95%"}}>
                                {img_src != "" ? <Image src={`data:image/png;base64, ${img_src}`} alt={name} layout="fill" objectFit="cover" /> : <div/>}
                            </div>
                            <div>
                                <div className="text-black">...............................................</div>
                                <p className="text-lg text-black font-bold pt-2"> :: {name} :: </p>
                                <div className="text-black">...............................................</div>
                            </div>
                        </div>
                        <button className="mt-4 text-s self-center bg-white px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0 flex flex-row"><GiSaveArrow className="mr-2" style={{ transform: 'translateY(3px)' }}/> Save Changes</button>
                        <span className="hidden md:flex flex-row items-center text-black text-sm mb-8 hover:bg-gray-400 rounded-lg p-2 mt-20 self-center">
                            <GiTrashCan className="" style={{ transform: 'translateY(-3px)' }}/>
                            <p>Delete Character</p>
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
    <label className="text-black text-xl">Portrait Image</label>
    <div className="flex flex-wrap items-start">
        <textarea
            className="border border-black border-dotted outline-none bg-inherit px-4 py-4 flex-grow min-h-[150px]"
            placeholder="Describe the appearance of your character"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    </div>
    <div className="border border-gray-400 mt-5 border-dotted border-2 ">
        { imageUrl != "" ? <Image src={`data:image/png;base64, ${imageUrl}`} alt="Character Image" width={300} height={200}/> : <div/> }
    </div>
    <div className="flex flex-row justify-evenly">
    <button className="mt-4 text-s self-end bg-white px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0" onClick={handleGeneration}>Generate</button>
         <button className="mt-4 text-s self-end bg-white px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0" onClick={selectImage}>Select</button>
    </div>
</div>



            </div>
        </div>
    );
}
