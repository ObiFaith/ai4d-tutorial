import "dotenv/config";
import { OpenRouter } from "@openrouter/sdk";

export const callOpenRouterSdk = async (prompt: string) => {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const OPENROUTER_MODEL_NAME = process.env.OPENROUTER_MODEL_NAME;

  if (!OPENROUTER_API_KEY || !OPENROUTER_MODEL_NAME) {
    throw new Error("Missing environment variables");
  }

  const client = new OpenRouter({
    apiKey: OPENROUTER_API_KEY,
  });

  const response = await client.chat.send({
    chatRequest: {
      model: OPENROUTER_MODEL_NAME,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
  });

  return response.choices[0].message.content;
};
