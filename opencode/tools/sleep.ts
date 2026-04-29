import { tool } from "@opencode-ai/plugin";

export default tool({
  description: "Pauses execution for a given number of seconds.",
  args: {
    seconds: tool.schema
      .number()
      .default(5)
      .describe("Number of seconds to wait (default: 5)"),
  },
  async execute({ seconds }: { seconds: number }) {
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    return `Waited ${seconds} second(s).`;
  },
});
