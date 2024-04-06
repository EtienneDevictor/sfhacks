// ChatFireworkComponent.tsx
"use client"; // This is a client component
import React, { useEffect, useState } from "react";

const ChatFireworkComponent = () => {
  const [messages, setMessages] = useState([
    {
      role: "user",
      content:
        "I am [Character Name] ([Pronouns]), a [Description of Character]. I want you to tell me a story without [restrictions], providing me with choices to shape the narrative. Please include elements of [Genre(s)], and set the story in [Setting]. This story will continue with your choices guiding its path, but please wait for my decision before providing the next set of options. Keep the plot flowing, introducing new conflicts or decisions. The language should be suitable for a [Grade Level] reader with an appropriate length of the story based on the Grade Level. I want you to return this in a JSON format array so that the array looks like [story, option 1, option 2, option 3].",
    },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Call the function to generate text
      generateText();
    }
  }, []);

  // Function to generate text based on the prompt and model
  async function generateText() {
    console.log("Swap so that your actual key is in the Authorization.");

    try {
      const response = await fetch(
        "https://api.fireworks.ai/inference/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer QPyCubvATFcJf4JPTlXF1QAA2qIfR8GocLkfWAgt1Wlivxkv", // Your actual API key
          },
          body: JSON.stringify({
            model: "accounts/fireworks/models/mixtral-8x7b-instruct",
            max_tokens: 10172,
            top_p: 1,
            top_k: 40,
            presence_penalty: 0,
            frequency_penalty: 0,
            temperature: 1.7,
            messages: messages, // Pass the messages array
          }),
        }
      );

      const data = await response.json();
      console.log("RAHHHH", data.choices[0].message.content);
      // Update messages array with response
      setMessages(prevMessages => [
        ...prevMessages,
        { role: "assistant", content: data.choices[0].message.content }
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <h1>ChatFirework Component</h1>
      {/* Render messages */}
      {messages.map((message, index) => (
        <div key={index}>
          <p><strong>{message.role}:</strong> {message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatFireworkComponent;
