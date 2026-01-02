// src/ai/gemini.js
// Phase A: Mock Gemini AI (NO API, NO BILLING)

export async function summarizeContext(contextText) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // very simple "AI-style" logic
      let summary = "📘 AI Resume Summary:\n\n";

      if (contextText.toLowerCase().includes("logic")) {
        summary +=
          "• You have understood the core logic of the problem.\n" +
          "• Implementation is partially complete.\n" +
          "• Next step: handle edge cases and optimize the solution.\n";
      } else if (contextText.toLowerCase().includes("video")) {
        summary +=
          "• You were learning through video content.\n" +
          "• Progress was paused midway.\n" +
          "• Next step: resume from the last watched concept.\n";
      } else {
        summary +=
          "• Work was in progress.\n" +
          "• Review previous steps carefully.\n" +
          "• Decide the next actionable task.\n";
      }

      summary += "\n✅ You can resume work immediately.";

      resolve(summary);
    }, 800); // simulate AI thinking time
  });
}
