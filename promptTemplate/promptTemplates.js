const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage  } = require("@langchain/core/messages");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const dotenv = require("dotenv");
(async () => {
dotenv.config();



// const template = "Translate the following from English into {language}";
// const promptTemplate = ChatPromptTemplate.fromMessages([
//   ["system", template],
//   ["user", "{text}"],
// ]);

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,

});

const template = "Translate the following from English into {language}";
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", template],
  ["user", "{text}"],
]);

const chain = promptTemplate.pipe(llm);
const result = await chain.invoke({ language: "Italian", text: "hell world!" });
console.log(result);

// const result = await llm.invoke({ language: "Italian",text: "hello!" });
// console.log(result);


})();
