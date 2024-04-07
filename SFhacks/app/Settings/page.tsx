'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GiSaveArrow } from 'react-icons/gi';
import { updateGlobal } from '../data/neurelo';

export default function Setting() {
  const router = useRouter();

  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedInputMethod, setSelectedInputMethod] = useState<string>('');

  const grades: string[] = ['Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade'];
  const inputMethods: string[] = ['Text Box', 'Multiple Choice'];

  const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGrade(event.target.value);
  };

  const handleInputMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedInputMethod(event.target.value);
  };

  const [selectedControls, setSelectedControls] = useState<string[]>([]);

  const controls: string[] = ['War', 'Domestic Abuse', 'Glorifying Crime', 'The British Government', 'The French Flag', 'Gore', 'Torture', 'Religion', 'Foul Language'];

  const handleControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (selectedControls.includes(value)) {
      setSelectedControls(selectedControls.filter(control => control !== value));
    } else {
      setSelectedControls([...selectedControls, value]);
    }
  };

  const saveHandler = async () => {
    console.log(`Selected: ${selectedGrade} + inputMethod: ${selectedInputMethod} + controls: ${selectedControls}`)
  };

  return (
    <div className="flex flex-col items-center mt-5 h-full">
      <button
        className="absolute top-4 left-4 text-black px-4 py-2"
        onClick={() => router.push('/')}
      >
        {'<< Home'}
      </button>
      <h1 className="text-4xl m-10 self-center"> :: For Parents :: </h1>
      <div className="flex flex-row justify-center p-8">
        <div className="flex flex-col w-2/5 items-center">
          <h2 className="text-3xl">Content Controls</h2>
          <p>By selecting these options, you are instructing our AI to not engage in scenes that include the content.</p>
          <div className="border-black border-2 border-dotted rounded-md overflow-hidden mb-4 flex flex-col flex-grow justify-evenly text-xl">
            {controls.map(control => (
              <div key={control} className="hover:bg-orange-950 hover:bg-opacity-10 flex flex-row items-center w-full h-full table m-2">
                <input
                  type="checkbox"
                  name="control"
                  className="mx-4 h-full table-cell align-middle outline-black outline-1 accent-orange-900"
                  id={control}
                  value={control}
                  checked={selectedControls.includes(control)}
                  onChange={handleControlChange}
                />
                <label
                  htmlFor={control}
                  className="h-full w-full table-cell align-middle"
                >
                  {control}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-2/5 items-center">
          <div className="flex flex-col">
            <h2 className="text-3xl">Reading Level</h2>
            <div className="border-black border-2 border-dotted rounded-md overflow-hidden mb-4 flex flex-col flex-grow justify-evenly text-xl">
              {grades.map(grade => (
                <div key={grade} className="hover:bg-orange-950 hover:bg-opacity-10 flex flex-row items-center w-full h-full table m-2">
                  <input
                    type="radio"
                    name="grade"
                    className="mx-4 h-full table-cell align-middle outline-black outline-1 accent-orange-900"
                    id={grade}
                    value={grade}
                    checked={selectedGrade === grade}
                    onChange={handleGradeChange}
                  />
                  <label
                    htmlFor={grade}
                    className="h-full w-full table-cell align-middle"
                  >
                    {grade}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl">Input Method</h2>
            <div className="border-black border-2 border-dotted rounded-md overflow-hidden mb-4 flex flex-col flex-grow justify-evenly text-xl">
              {inputMethods.map(method => (
                <div key={method} className="hover:bg-orange-950 hover:bg-opacity-10 flex flex-row w-full h-full table m-2">
                  <input
                    type="radio"
                    name="inputMethod"
                    className="mx-4 h-full table-cell align-middle outline-black outline-1 accent-orange-900"
                    id={method}
                    value={method}
                    checked={selectedInputMethod === method}
                    onChange={handleInputMethodChange}
                  />
                  <label
                    htmlFor={method}
                    className="h-full w-full table-cell align-middle"
                  >
                    {method}
                  </label>
                </div>
              ))}
            </div>
            <button className="mt-4 text-s self-center bg-white px-4 py-2 rounded-full shadow-black shadow-sm r-0 b-0 flex flex-row" onClick={saveHandler}>
              <GiSaveArrow className="mr-2" style={{ transform: 'translateY(3px)' }} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
