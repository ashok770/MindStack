const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function summarizeContext(contextText) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
You are an academic assistant.
Summarize the following student work context so the student can resume work easily.

Context:
${contextText}
                `,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!data.candidates) {
    throw new Error("No response from Gemini");
  }

  return data.candidates[0].content.parts[0].text;
}
