import express from "express";
import { 
  getTouristVisaAdvice,
  getWorkVisaAdvice,
  getStudyVisaAdvice,
  getPermanentResidencyAdvice,
} from "../controllers/retrieverController.js";

const router = express.Router();

// Route for Tourist Visa Advice
router.post("/tourist-visa-advice", getTouristVisaAdvice);

// Route for Work Visa Advice
router.post("/work-visa-advice", getWorkVisaAdvice);

// Route for Study Visa Advice
router.post("/study-visa-advice", getStudyVisaAdvice);

// Route for Permanent Residency Advice
router.post("/permanent-residency-advice", getPermanentResidencyAdvice);

export default router;
