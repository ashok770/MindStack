const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.summarizeContext = functions.https.onRequest(async (req, res) => {
  try {
    // Allow only POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { contextText } = req.body;

    if (!contextText) {
      return res.status(400).json({ error: "contextText is required" });
    }

    // Gemini API key stored securely in Firebase config
    const apiKey = functions.config().gemini.key;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
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
You are an academic productivity assistant.

A student paused their work and is returning after a break.
Summarize the context so the student can resume instantly.

Context:
${contextText}

Respond in 2–3 clear lines.
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
      return res.status(500).json({ error: "Gemini failed to respond" });
    }

    return res.status(200).json({
      summary: data.candidates[0].content.parts[0].text,
    });
  } catch (error) {
    console.error("Gemini Function Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
