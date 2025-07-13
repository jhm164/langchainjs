// MessagesPlaceholder
// ChatPromptTemplate is especially useful when you want to dynamically insert a list of messages
// E.g
// 1. You want to insert a list of messages from a database
// 2. You want to insert a list of messages from a file
// 3. You want to insert a list of messages from a web API
// 4. You want to insert a list of messages from a user
// 5. You want to insert a list of messages from a chat application
// 6. You want to insert a list of messages from a chat History

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const {
  ChatPromptTemplate,
  MessagesPlaceholder,
} = require("@langchain/core/prompts");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../", ".env") });

(async () => {
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const chatTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant that can answer questions about the world.",
    ],
    new MessagesPlaceholder("history"),
    ["user", "{input}"],
  ]);

  const chain = chatTemplate.pipe(llm);

  const result = await chain.invoke({
    input: "What is the capital of India?",
    history: [
      { role: "user", content: "India is a very big country" },
      { role: "assistant", content: "Yes, India is indeed a large country with diverse geography and culture." }
    ]
  });

  console.log(result);
})();
