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
                    content: 'Say this is a test'
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
