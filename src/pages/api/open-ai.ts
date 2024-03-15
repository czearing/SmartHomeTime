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
  const instructions = req.query.instructions as string;

  // Call the chat endpoint with the prompt and some options
  const response = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: instructions,
      },
    ],
    max_tokens: 120,
  });

  // Get the response data
  const data: any = response;

  // Send a JSON response with the data
  res.status(200).json(data?.choices?.[0]?.message);
}
