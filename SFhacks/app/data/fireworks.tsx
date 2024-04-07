import axios from "axios";
import { Message } from "neurelo-sdk";
export const promptMixtral = async (
  prompt: string,
  fallback_response: string = "",
  always_fallback: boolean = false,
) => {
  if (always_fallback) return fallback_response;
  const options = {
    method: "POST",
    url: "https://api.fireworks.ai/inference/v1/chat/completions",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
    },
    data: {
      model: "accounts/fireworks/models/mixtral-8x7b-instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 4096,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
      stop: null,
      response_format: { type: "text" },
      stream: false,
    },
  };

  var res;
  try {
    const response = await axios.request(options);
    res = response.data;
  } catch (error) {
    console.error(error);
    return fallback_response;
  }
  // res.choices[0].message;
  return res.choices[0].message.content;
};
export const promptMixtralChain = async (messages: Message[]) => {
  const options = {
    method: "POST",
    url: "https://api.fireworks.ai/inference/v1/chat/completions",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
    },
    data: {
      model: "accounts/fireworks/models/mixtral-8x7b-instruct",
      messages: messages,
      max_tokens: 4096,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
      stop: null,
      response_format: { type: "text" },
      stream: false,
    },
  };

  var response_message;
  try {
    const response = await axios.request(options);
    response_message = response.data.choices[0].message;
  } catch (error) {
    console.error(error);
  }
  // res.choices[0].message;
  messages.push(response_message);
  return response_message;
};

export async function promptSDXL(description: string): Promise<string> {
  const response = await fetch(
    "https://api.fireworks.ai/inference/v1/image_generation/accounts/fireworks/models/stable-diffusion-xl-1024-v1-0",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
        Accept: "application/json",
      },
      body: JSON.stringify({ prompt: description }),
    },
  );
  return await response.json().then((data) => data[0].base64);
}
