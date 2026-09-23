export default {
  id: "sleep",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.add({
        name: "sleep",
        description: "Pauses execution for a given number of seconds.",
        input: {
          type: "object",
          properties: {
            seconds: {
              type: "number",
              default: 5,
              description: "Number of seconds to wait (default: 5)",
            },
          },
          additionalProperties: false,
        },
        async execute(input) {
          const seconds = (input as { seconds?: number }).seconds ?? 5
          await new Promise((resolve) => setTimeout(resolve, seconds * 1000))
          return { content: `Waited ${seconds} second(s).` }
        },
      })
    })
  },
}
