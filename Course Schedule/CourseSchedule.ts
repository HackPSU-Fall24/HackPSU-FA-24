import OpenAI from "openai";
import * as dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Initialize OpenAI API with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to call OpenAI GPT model
async function callGPT(prompt: string): Promise<void> {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or "gpt-4" for GPT-4
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // Adjust based on your needs
    });

    // Log the response
    console.log("Response:", response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error calling the OpenAI API:", error);
  }
}

// Example usage
callGPT("What are the main advantages of TypeScript over JavaScript?");
