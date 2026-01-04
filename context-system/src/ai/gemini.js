// src/ai/gemini.js
// Smart Mock AI - No API keys needed, but provides natural, contextual summaries

export async function summarizeContext(contextText, taskTitle = "") {
  return new Promise((resolve) => {
    setTimeout(() => {
      const context = contextText.toLowerCase();
      let summary = "🧠 **Context Resume Summary**\n\n";
      
      // Extract key information patterns
      const hasCompleted = context.match(/(done|completed|finished|implemented|created|built)/g);
      const hasNextSteps = context.match(/(next|todo|need to|should|will|plan to)/g);
      const hasProblems = context.match(/(error|issue|problem|stuck|challenge|bug)/g);
      const hasLearning = context.match(/(learn|understand|study|watch|read|tutorial)/g);
      const hasCode = context.match(/(code|function|component|api|database|query|algorithm)/g);

      // Build intelligent summary based on context
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
        summary += `⚠️ You encountered ${hasProblems.length} challenge(s) that need attention. `;
      } else if (hasCompleted && hasCompleted.length > 2) {
        summary += "✅ Good progress! Multiple components are complete. ";
      } else {
        summary += "📝 Work is in progress with some components started. ";
      }

      summary += "\n\n**Recommended Next Steps:**\n";
      
      if (hasNextSteps) {
        // Try to extract actual next steps from context
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

      summary += "\n\n💡 **Quick Tip:** Take a moment to review your saved context notes above to get back into the flow smoothly.";

      resolve(summary);
    }, 1200); // Simulate realistic AI processing time
  });
}
