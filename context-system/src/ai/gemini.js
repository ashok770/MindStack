import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from .env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(apiKey);

// Use Gemini Pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const getResumeSummary = async (taskTitle, contextNotes) => {
  const prompt = `
You are an academic productivity assistant.

A student paused their work and is returning after a break.
Based on the task details below, generate a short and clear resume summary.

Task Title:
${taskTitle}

Context Notes:
${contextNotes}

Your response should:
- Briefly state what was already done
- Clearly mention what the student planned to do next
- Be concise (2–3 lines)
- Avoid unnecessary technical jargon
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
};
