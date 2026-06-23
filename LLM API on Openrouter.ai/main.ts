import "dotenv/config";

async function callLlmApi(prompt: string) {
  const API_KEY = process.env.GEMINI_API_KEY;
  const BASE_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/";
  const MODEL_NAME = "gemini-2.5-flash";

  const url = `${BASE_API_URL}${MODEL_NAME}:generateContent?key=${API_KEY}`;
  const headers = { "Content-Type": "application/json" };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const result = await response.json();
  return result?.candidates[0]?.content?.parts[0].text;
}

(async () => {
  const result = await callLlmApi(process.argv[2]);
  console.log(result);
})();
