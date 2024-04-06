import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";
const axios = require('axios');

// Function to generate text based on the prompt and model
async function generateText() {
    try {
        const response = await fetch('https://api.fireworks.ai/inference/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ${process.env.FIREWORKS_API_KEY}'
            },
            body: JSON.stringify({
                model: 'accounts/fireworks/models/mixtral-8x7b-instruct',
                max_tokens: 10172,
                top_p: 1,
                top_k: 40,
                presence_penalty: 0,
                frequency_penalty: 0,
                temperature: 1.7,
                messages: [{
                    role: 'user',
                    content: 'I am [Character Name] ([Pronouns]), a [Description of Character]. I want you to tell me a story without violence, providing me with choices to shape the narrative. Please include elements of [Genre(s)], and set the story in [Setting]. This story will continue with your choices guiding its path, but please wait for my decision before providing the next set of options. Keep the plot flowing, introducing new conflicts or decisions. The language should be suitable for a [Grade Level] reader.'
                }]
            })
        });

        const data = await response.json();
        console.log(data.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
    }
}



// Call the function to generate text
generateText();
