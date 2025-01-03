import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { ChatGroq } from "@langchain/groq";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { getVisaGeneralAdviceTemplate } from "../utils/templates.js";

const question = "how can become a permentent resident in South Africa?";
const client = new MongoClient(process.env.MONGO_URI || "");
const collection = client
  .db(process.env.MONGO_DB_NAME)
  .collection(process.env.MONGO_COLLECTION_NAME);

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: process.env.EMBEDDING_MODEL || "text-embedding-004",
});

const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection: collection,
  indexName: "vector_index",
  textKey: "text",
  embeddingKey: "embedding",
});

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.LLM_MODEL,
  temperature: 0,
});

const tool = new TavilySearchResults({
  maxResults: 1,
  apiKey: process.env.TAVILY_API_KEY,
});

const embeddingResults = await vectorStore.similaritySearch(question, 1);
const combinedEmbeddingResults = embeddingResults
  .map((doc) => doc.pageContent)
  .join("\n");

const webSearchResults = await tool.invoke(question);
const parsedWebResults = JSON.parse(webSearchResults);
const combinedWebResults = parsedWebResults
  .map((result) => result.content)
  .join("\n");

const result = await llm.invoke(
  getVisaGeneralAdviceTemplate(combinedEmbeddingResults, combinedWebResults)
);

console.log(result.content);
