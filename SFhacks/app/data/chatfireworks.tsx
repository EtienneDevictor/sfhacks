// ChatFireworkComponent.tsx
"use client"; // This is a client component
import React, { useState, useEffect } from "react";


interface ChatFireworkProps {
    story: string;
  }
  
const ChatFireworkComponent = () => {
  const [messages, setMessages] = useState([
    {
      role: "user",
      content:
       "I am [Alex] (he/him), a kind-hearted artist who loves to create colorful murals and inspiring sculptures. I want you to tell me a story without any restrictions, providing me with only 3 choices to shape the narrative. Please include elements of fantasy and adventure, and set the story in a magical kingdom. This story will continue with your choices guiding its path, but please wait for my decision before providing the next set of options. Keep the plot flowing, introducing new conflicts or decisions. The language should be suitable for a 5th-grade reader with an appropriate length of the story based on the grade level. I want you to return this in a JSON format array so that the array looks like arr = [story:, option 1:, option 2:, option 3:]."
    },
  ]);
  const [userInput, setUserInput] = useState("");

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
            messages: messages,
          }),
        }
      );

      const data = await response.json();

      // Extract assistant's response
      const assistantResponse = data.choices[0].message.content;
      // Update messages array with assistant's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
      // Handle error - maybe display a message to the user
    }
  }

  // Function to handle user input submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add user input to messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userInput },
    ]);
    // Clear the input field
    setUserInput("");
    // Call the function to generate text (assistant's response)
    generateText();
  };

  return (
    <div>
      <h1>ChatFirework Component</h1>
      {/* Render messages */}
      {messages.map((message, index) => (
        <div key={index}>
          <p>
            <strong>{message.role}:</strong> {message.content}
          </p>
        </div>
      ))}
      {/* Form for user input */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChatFireworkComponent;
