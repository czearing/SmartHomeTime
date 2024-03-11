// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the prompt from the query parameter
  const prompt = req.query.prompt as string;

  // Call the chat endpoint with the prompt and some options
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content:
          "Briefly tell me something cool about today and a concise overview of the weather.",
      },
    ],
    max_tokens: 120,
  });

  // Get the response data
  const data: any = response;

  // Send a JSON response with the data
  res.status(200).json(data?.choices?.[0]?.message);
}
