import "dotenv/config";
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const callOpenRouterSdk = async (prompt: string) => {
  const model = process.env.OPENROUTER_MODEL_NAME;

  if (!model) {
    throw new Error("Missing OPENROUTER_MODEL_NAME");
  }

  const response = await client.chat.send({
    chatRequest: {
      model,
      messages: [{ role: "user", content: prompt }],
    },
  });

  return response.choices[0].message.content;
};
