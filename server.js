import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import retrieverRoutes from "./routes/retrieverRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors());

// If you want to allow only specific origins:
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/result", retrieverRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
