// chatAI.js (or in your existing server file)
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to send a user prompt and get AI response
export async function getAIResponse(userMessage) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // free-tier compatible
      messages: [{ role: "user", content: userMessage }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI error:", error);
    return "Sorry, something went wrong!";
  }
}
