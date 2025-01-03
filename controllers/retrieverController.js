import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { ChatGroq } from "@langchain/groq";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { 
  getVisaGeneralAdviceTemplate, 
  getTouristVisaAdviceTemplate, 
  getWorkVisaAdviceTemplate, 
  getStudyVisaAdviceTemplate, 
  getPermanentResidencyAdviceTemplate 
} from "../utils/templates.js";

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

// Endpoint for Tourist Visa Advice
// @desc    Get tourist visa advice
// @route   POST /api/tourist-visa-advice
// @access  Public
const getTouristVisaAdvice = async (req, res) => {
  const { country, duration } = req.body;

  try {
    const embeddingResults = await vectorStore.similaritySearch(`how to get a tourist visa for ${country}`, 1);
    const combinedEmbeddingResults = embeddingResults.map((doc) => doc.pageContent).join("\n");

    const webSearchResults = await tool.invoke(`how to get a tourist visa for ${country}`);
    const parsedWebResults = JSON.parse(webSearchResults);
    const combinedWebResults = parsedWebResults.map((result) => result.content).join("\n");

    const result = await llm.invoke(
      getTouristVisaAdviceTemplate(combinedEmbeddingResults, combinedWebResults, country, duration)
    );
    res.json({ results: result.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint for Work Visa Advice
// @desc    Get work visa advice
// @route   POST /api/work-visa-advice
// @access  Public
const getWorkVisaAdvice = async (req, res) => {
  const { jobOffer, country } = req.body;

  try {
    const embeddingResults = await vectorStore.similaritySearch(`how to get a work visa for ${country}`, 1);
    const combinedEmbeddingResults = embeddingResults.map((doc) => doc.pageContent).join("\n");

    const webSearchResults = await tool.invoke(`how to get a work visa for ${country}`);
    const parsedWebResults = JSON.parse(webSearchResults);
    const combinedWebResults = parsedWebResults.map((result) => result.content).join("\n");

    const result = await llm.invoke(
      getWorkVisaAdviceTemplate(combinedEmbeddingResults, combinedWebResults, jobOffer, country)
    );
    res.json({ results: result.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint for Study Visa Advice
// @desc    Get study visa advice
// @route   POST /api/study-visa-advice
// @access  Public
const getStudyVisaAdvice = async (req, res) => {
  const { country, admissionLetter } = req.body;

  try {
    const embeddingResults = await vectorStore.similaritySearch(`how to get a study visa for ${country}`, 1);
    const combinedEmbeddingResults = embeddingResults.map((doc) => doc.pageContent).join("\n");

    const webSearchResults = await tool.invoke(`how to get a study visa for ${country}`);
    const parsedWebResults = JSON.parse(webSearchResults);
    const combinedWebResults = parsedWebResults.map((result) => result.content).join("\n");

    const result = await llm.invoke(
      getStudyVisaAdviceTemplate(combinedEmbeddingResults, combinedWebResults, country, admissionLetter)
    );
    res.json({ results: result.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint for Permanent Residency Advice
// @desc    Get permanent residency advice
// @route   POST /api/permanent-residency-advice
// @access  Public
const getPermanentResidencyAdvice = async (req, res) => {
  const { country, status } = req.body;

  try {
    const embeddingResults = await vectorStore.similaritySearch(`how to apply for permanent residency in ${country}`, 1);
    const combinedEmbeddingResults = embeddingResults.map((doc) => doc.pageContent).join("\n");

    const webSearchResults = await tool.invoke(`how to apply for permanent residency in ${country}`);
    const parsedWebResults = JSON.parse(webSearchResults);
    const combinedWebResults = parsedWebResults.map((result) => result.content).join("\n");

    const result = await llm.invoke(
      getPermanentResidencyAdviceTemplate(combinedEmbeddingResults, combinedWebResults, country, status)
    );
    res.json({ results: result.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getTouristVisaAdvice,
  getWorkVisaAdvice,
  getStudyVisaAdvice,
  getPermanentResidencyAdvice,
};
