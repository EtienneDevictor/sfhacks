'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiSaveArrow } from "react-icons/gi";

export default function Setting() {
    const router = useRouter();

    const [grade, setGrade] = useState(0);
    const [input, setInput] = useState(true);
    const [controls, setControls] = useState([]);

    const saveHandler = () => {
        // save to database
    }
   
    const grades = ['Pre-K', 'Kindergarden', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade'];
    const control = ['War', 'Domestic Abuse', 'Glorifying Crime', 'The British Government', 'The French Flag', 'Gore', 'Torture', 'Religon', 'Foul Language'];

    return (
        <div className="flex flex-col items-center mt-5 h-full">
            <button
                className="absolute top-4 left-4 text-black px-4 py-2"
                onClick={() => router.push('/')}
            >
                {"<< Home"}
            </button>
            <h1 className="text-4xl m-10 self-center"> :: For Parents :: </h1>
            <div className="flex flex-row justify-center p-8">
                <div className="flex flex-col w-2/5 items-center">
                    <h2 className="text-3xl">Content Controls</h2>
                    <p>By selecting these options, you are instructing our AI to not engage in scenes that include the content.</p>
                    <div className="border-black border-2 border-dotted rounded-md overflow-hidden mb-4 flex flex-col flex-grow justify-evenly text-xl">
                            {control.map((str) => (
                                <div className="hover:bg-orange-950 hover:bg-opacity-10 flex flex-row items-center w-full h-full table m-2">
                                <input
                                    type="checkbox"
                                    name="control"
                                    className="mx-4 h-full table-cell align-middle outline-black outline-1 accent-orange-900"
                                    id={str}
                                    value={str}
                                    key={str}
                                />
                                <label
                                    key={str}
                                    className="h-full w-full table-cell align-middle"
                                >
                                    {str}
                                </label>
                                </div>
                            ))}
                        </div>
                </div>
                <div className="flex flex-col w-2/5 items-center">

                    <div className="flex flex-col">
                        <h2 className="text-3xl">Reading Level</h2>
                        <div className="border-black border-2 border-dotted rounded-md overflow-hidden mb-4 flex flex-col flex-grow justify-evenly text-xl">
                            {grades.map((str) => (
                                <div className="hover:bg-orange-950 hover:bg-opacity-10 flex flex-row items-center w-full h-full table m-2">
                                <input
                                    type="radio"
                                    name="method"
                                    className="mx-4 h-full table-cell align-middle outline-black outline-1 accent-orange-900"
                                    id={str}
                                    value={str}
                                    key={str}
                                />
                                <label
                                    key={str}
                                    className="h-full w-full table-cell align-middle"
                                >
                                    {str}
                                </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-3xl">Input Method</h2>
                        <div className="border-black border-2 border-dotted rounded-md overflow-hidden mb-4 flex flex-col flex-grow justify-evenly text-xl">
                                <div className="hover:bg-orange-950 hover:bg-opacity-10 flex flex-row  w-full h-full table m-2">
                                <input
                                    type="radio"
                                    name="option"
                                    className="mx-4 h-full table-cell align-middle outline-black outline-1 accent-orange-900"
                                    id={"Text Box"}
                                    value={"Text Box"}
                                    key={"Text Box"}
                                />
                                <label
                                    key={"Text Box"}
                                    className="h-full w-full table-cell align-middle"
                                >
                                    {"Text Box"}
                                </label>
                                </div>
                                <div className="hover:bg-orange-950 hover:bg-opacity-10 flex flex-row  w-full h-full table">
                                <input
                                    type="radio"
                                    name="option"
                                    className="mx-4 h-full table-cell align-middle outline-black outline-1 accent-orange-900"
                                    id={"Mulitple Choice"}
                                    value={"Mulitple Choice"}
                                    key={"Mulitple Choice"}
                                />
                                <label
                                    key={" Mulitple Choice"}
                                    className="h-full w-full table-cell align-middle"
                                >
                                    {"Mulitple Choice"}
                                </label>
                                </div>
                        </div>
                        <button className="mt-4 text-s self-center bg-white px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0 flex flex-row" onClick={saveHandler}><GiSaveArrow className="mr-2" style={{ transform: 'translateY(3px)' }}/> Save Changes</button>
                    </div>
                </div>
            </div>
        </div>

    )
}