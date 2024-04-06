"use client"; // This is a client component

import React from "react";
import { useState } from 'react';

import ChatFireworkComponent from "../data/chatfireworks";

const Page = () => {
    const [story, setStory] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setStory(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div>
          <h1>Welcome to My Story Page</h1>
          <h2>What do you want your story to be about?</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={story}
              onChange={handleChange}
              placeholder="Write your story here..."
            />
            <button type="submit">Submit</button>
          </form>
          {!submitted && (
            <p>
              Sample Text:
              <br />
              Once upon a time, in a faraway land...
            </p>
          )}
          {/* {submitted && <ChatFireworkComponent story={story} />} */}
        </div>
      );
    };
  
  export default Page;