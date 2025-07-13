const { tool } = require("@langchain/core/tools");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const {
  ChatPromptTemplate,
  MessagesPlaceholder,
} = require("@langchain/core/prompts");
const dotenv = require("dotenv");
const path = require("path");
const { z } = require("zod");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

(async () => {
  const multiply = tool(
    async ({ a, b }) => {
      return a * b;
    },
    {
      name: "multiplyNumbers", // ✅ valid function name
      description: "Multiply two numbers",
      schema: z.object({
        a: z.number().describe("First number to multiply"),
        b: z.number().describe("Second number to multiply"),
      }),
    }
  );

  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant that can call tools."],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(llm.bindTools([multiply]));

  const result = await chain.invoke({
    input: "multiply 2 and 3",
    chat_history: [],
  });

  // Extract tool call and execute
  if (result.tool_calls && result.tool_calls.length > 0) {
    const toolCall = result.tool_calls[0];
    const toolResult = await multiply.invoke(toolCall.args);
    console.log("✅ Final tool result:", toolResult);
  } else {
    console.log("💡 LLM response (no tool used):", result.content);
  }
})();
