const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const dotenv = require("dotenv");
const path = require("path");
console.log(path.join(__dirname, "../", ".env"));

dotenv.config({ path: path.join(__dirname, "../", ".env") });

(async () => {
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const chatTemplate = ChatPromptTemplate.fromMessages([
   [ "system", "write code in python" ],
    [ "user", "write {text} code " ],
  ]);

  const chain = chatTemplate.pipe(llm);

  const result = await chain.invoke({
    text: "print hello world",
  });

  console.log(result);
})();
