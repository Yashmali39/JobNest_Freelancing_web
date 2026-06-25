import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

console.log(process.env.GEMINI_API_KEY);

export default genAI;