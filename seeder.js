import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { Document } from "@langchain/core/documents";
import fs from "fs";
import path from "path";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || "");
const collection = client
  .db(process.env.MONGO_DB_NAME)
  .collection(process.env.MONGO_COLLECTION_NAME);

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  taskType: TaskType.RETRIEVAL_DOCUMENT,
});

const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection: collection,
  indexName: "vector_index",
  textKey: "text",
  embeddingKey: "embedding",
});

const folderPath = path.resolve("data");

const loadDocumentsFromFolder = (folderPath) => {
  const files = fs.readdirSync(folderPath);
  const documents = [];
  files.forEach((file) => {
    if (path.extname(file) === ".txt") {
      const content = fs.readFileSync(path.join(folderPath, file), "utf8");
      documents.push(
        new Document({
          pageContent: content,
          metadata: { source: file },
        })
      );
    }
  });
  return documents;
};

const documents = loadDocumentsFromFolder(folderPath);
const ids = documents.map((_, index) => (index + 1).toString());
await vectorStore.addDocuments(documents, { ids });

console.log("Documents have been successfully added to the vector store!");
