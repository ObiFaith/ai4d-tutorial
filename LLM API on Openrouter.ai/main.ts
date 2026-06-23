import "dotenv/config";

async function callLlmApi(prompt: string) {
  const API_KEY = process.env.OPENROUTER_API_KEY;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-oss-120b:free",
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
