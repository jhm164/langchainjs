const { HumanMessage, SystemMessage,AIMessage } = require("@langchain/core/messages");

const messages = [
    new SystemMessage("Translate the following from English into Italian"),
    new HumanMessage("hi!"),
    new AIMessage("hello!"),
  ];
  
console.log(messages);