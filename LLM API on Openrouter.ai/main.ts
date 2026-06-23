import "dotenv/config";

const callLlmApi = async (prompt: string) => {
  const API_KEY = process.env.OPENROUTER_API_KEY;
  const MODEL_NAME = process.env.OPENROUTER_MODEL_NAME;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  const data = await response.json();
  return data.choices[0].message.content;
}

(async () => {
  const result = await callLlmApi(process.argv[2]);
  console.log(result);
})();
