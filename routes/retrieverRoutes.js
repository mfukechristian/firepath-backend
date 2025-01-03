import express from "express";
import { getGeneralVisaAdvice } from "../controllers/retrieverController.js";

const router = express.Router();

// Route for General Visa Advice
router.post("/general-visa-advice", getGeneralVisaAdvice);

export default router;
