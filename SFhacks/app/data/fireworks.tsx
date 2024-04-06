import axios from "axios";
export const promptMixtral = async (
  prompt: string,
  fallback_response: string,
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
    console.log(res);
  } catch (error) {
    console.error(error);
    return fallback_response;
  }
  // res.choices[0].message;
  return res.choices[0].message.content;
};
