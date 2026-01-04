// src/ai/gemini.js
// Real Gemini API Integration for Context Resume (Using REST API directly)

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log("Gemini API Key loaded:", API_KEY ? "Yes (length: " + API_KEY.length + ")" : "No");

export async function summarizeContext(contextText, taskTitle = "") {
  // If no API key, fall back to smart mock
  if (!API_KEY || !API_KEY.trim()) {
    console.warn("No API key found, using mock AI");
    return generateMockSummary(contextText, taskTitle);
  }

  try {
    console.log("Calling Gemini API via REST...");
    
    const prompt = `You are an academic productivity assistant helping a student/developer resume their work after a break.

Task Title: ${taskTitle || "Untitled Task"}

Context Notes:
${contextText}

Please provide a concise, helpful summary that will help them quickly resume their work. Structure your response as follows:

**What You Were Doing:**
[Brief summary of what they were working on]

**Current Status:**
[What's been completed or where they left off]

**Recommended Next Steps:**
[2-3 actionable next steps based on their context]

Keep it concise (3-4 short paragraphs), friendly, and actionable. Use emojis sparingly for clarity.`;

    // Use REST API directly - works with Google AI Studio API keys
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
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
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid API response format");
    }

    const text = data.candidates[0].content.parts[0].text;
    console.log("Gemini API success!");
    return text;
  } catch (error) {
    console.error("Gemini API Error Details:", error);
    console.error("Error message:", error.message);
    
    // Fallback to mock AI
    console.warn("Gemini API call failed, falling back to mock AI");
    return generateMockSummary(contextText, taskTitle);
  }
}

// Smart mock fallback function
function generateMockSummary(contextText, taskTitle = "") {
  return new Promise((resolve) => {
    setTimeout(() => {
      const context = contextText.toLowerCase();
      let summary = "**Context Resume Summary**\n\n";
      
      const hasCompleted = context.match(/(done|completed|finished|implemented|created|built)/g);
      const hasNextSteps = context.match(/(next|todo|need to|should|will|plan to)/g);
      const hasProblems = context.match(/(error|issue|problem|stuck|challenge|bug)/g);
      const hasLearning = context.match(/(learn|understand|study|watch|read|tutorial)/g);
      const hasCode = context.match(/(code|function|component|api|database|query|algorithm)/g);

      summary += "**What You Were Doing:**\n";
      
      if (hasLearning && hasCode) {
        summary += `You were learning ${hasCode[0]} concepts and working on implementation. `;
      } else if (hasLearning) {
        summary += "You were in a learning phase, consuming content to build knowledge. ";
      } else if (hasCode) {
        summary += `You were actively developing, working with ${hasCode[0]} components. `;
      } else {
        summary += "You were making progress on your task. ";
      }

      if (hasCompleted && hasCompleted.length > 0) {
        summary += `You've completed ${hasCompleted.length} key milestone(s). `;
      }

      summary += "\n\n**Current Status:**\n";
      
      if (hasProblems) {
        summary += `You encountered ${hasProblems.length} challenge(s) that need attention. `;
      } else if (hasCompleted && hasCompleted.length > 2) {
        summary += "Good progress! Multiple components are complete. ";
      } else {
        summary += "Work is in progress with some components started. ";
      }

      summary += "\n\n**Recommended Next Steps:**\n";
      
      if (hasNextSteps) {
        const nextStepsMatch = contextText.match(/(?:next|todo|need to|should|will|plan to)[^.!?]*[.!?]/gi);
        if (nextStepsMatch && nextStepsMatch.length > 0) {
          summary += nextStepsMatch.slice(0, 2).map((step, idx) => `${idx + 1}. ${step.trim()}`).join("\n");
        } else {
          summary += "1. Review what you've completed so far\n";
          summary += "2. Continue with the next logical step in your workflow";
        }
      } else if (hasProblems) {
        summary += "1. Address the issues/challenges you noted\n";
        summary += "2. Test your fixes thoroughly\n";
        summary += "3. Continue with the next planned task";
      } else if (hasLearning) {
        summary += "1. Apply what you learned in a practical example\n";
        summary += "2. Build a small project or component to reinforce concepts\n";
        summary += "3. Document key takeaways";
      } else {
        summary += "1. Review your previous work to refresh context\n";
        summary += "2. Identify the immediate next task\n";
        summary += "3. Start working on it systematically";
      }

      summary += "\n\n**Quick Tip:** Take a moment to review your saved context notes above to get back into the flow smoothly.";

      resolve(summary);
    }, 800);
  });
}
