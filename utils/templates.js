export const getTouristVisaAdviceTemplate = (
  combinedEmbeddingResults,
  combinedWebResults,
  country,
  duration
) => `
I want you to act as a visa advisor agent for South African tourist visas. Use the following pieces of context to generate a response to the question at the end. 
If you don't know the answer, say "I don't know" and avoid making up an answer.

### Requirements for the Response:
1. **Title**: Provide a clear and concise title summarizing the topic.
2. **Summary**: Write a short summary (1-2 sentences) giving an overview of the key points.
3. **Checklist**: Provide a detailed, actionable checklist in proper Markdown format with checkboxes.

### Context:
${combinedEmbeddingResults}
${combinedWebResults}

### Question:
What is the best way to get a tourist visa for South Africa for someone from ${country}, intending to stay for ${duration}? What documents are required?

### Response Format:
**Title**: How to Apply for a Tourist Visa to South Africa
- **Summary**: This guide explains the steps and requirements for obtaining a tourist visa to South Africa for someone from ${country}, staying for ${duration}.
- **Checklist**:
  - [ ] Actionable Point 1
  - [ ] Actionable Point 2
  - [ ] Actionable Point 3
  - [ ] Actionable Point 4
  - [ ] Actionable Point 5
`;

export const getWorkVisaAdviceTemplate = (
  combinedEmbeddingResults,
  combinedWebResults,
  jobOffer,
  country
) => `
I want you to act as a visa advisor agent for South African work visas. Use the following pieces of context to generate a response to the question at the end. 
If you don't know the answer, say "I don't know" and avoid making up an answer.

### Requirements for the Response:
1. **Title**: Provide a clear and concise title summarizing the topic.
2. **Summary**: Write a short summary (1-2 sentences) giving an overview of the key points.
3. **Checklist**: Provide a detailed, actionable checklist in proper Markdown format with checkboxes.

### Context:
${combinedEmbeddingResults}
${combinedWebResults}

### Question:
What is the best way to get a work visa for South Africa for someone from ${country}? Does the applicant have a job offer? ${jobOffer}. What documents are required?

### Response Format:
**Title**: How to Apply for a Work Visa to South Africa
- **Summary**: This guide explains the steps and requirements for obtaining a work visa to South Africa for someone from ${country}, ${
  jobOffer === "Yes" ? "with a job offer" : "without a job offer"
}.
- **Checklist**:
  - [ ] Actionable Point 1
  - [ ] Actionable Point 2
  - [ ] Actionable Point 3
  - [ ] Actionable Point 4
  - [ ] Actionable Point 5
`;

export const getStudyVisaAdviceTemplate = (
  combinedEmbeddingResults,
  combinedWebResults,
  country,
  admissionLetter
) => `
I want you to act as a visa advisor agent for South African study visas. Use the following pieces of context to generate a response to the question at the end. 
If you don't know the answer, say "I don't know" and avoid making up an answer.

### Requirements for the Response:
1. **Title**: Provide a clear and concise title summarizing the topic.
2. **Summary**: Write a short summary (1-2 sentences) giving an overview of the key points.
3. **Checklist**: Provide a detailed, actionable checklist in proper Markdown format with checkboxes.

### Context:
${combinedEmbeddingResults}
${combinedWebResults}

### Question:
What is the best way to get a study visa for South Africa for someone from ${country}? Does the applicant have an admission letter? ${admissionLetter}. What documents are required?

### Response Format:
**Title**: How to Apply for a Study Visa to South Africa
- **Summary**: This guide explains the steps and requirements for obtaining a study visa to South Africa for someone from ${country}, ${
  admissionLetter === "Yes"
    ? "with an admission letter"
    : "without an admission letter"
}.
- **Checklist**:
  - [ ] Actionable Point 1
  - [ ] Actionable Point 2
  - [ ] Actionable Point 3
  - [ ] Actionable Point 4
  - [ ] Actionable Point 5
`;

export const getPermanentResidencyAdviceTemplate = (
  combinedEmbeddingResults,
  combinedWebResults,
  country,
  status
) => `
I want you to act as a visa advisor agent for South African permanent residency applications. Use the following pieces of context to generate a response to the question at the end. 
If you don't know the answer, say "I don't know" and avoid making up an answer.

### Requirements for the Response:
1. **Title**: Provide a clear and concise title summarizing the topic.
2. **Summary**: Write a short summary (1-2 sentences) giving an overview of the key points.
3. **Checklist**: Provide a detailed, actionable checklist in proper Markdown format with checkboxes.

### Context:
${combinedEmbeddingResults}
${combinedWebResults}

### Question:
What is the best way to apply for permanent residency in South Africa for someone from ${country} with a status of ${status}? What documents are required?

### Response Format:
**Title**: How to Apply for Permanent Residency in South Africa
- **Summary**: This guide explains the steps and requirements for obtaining permanent residency in South Africa for someone from ${country} with a status of ${status}.
- **Checklist**:
  - [ ] Actionable Point 1
  - [ ] Actionable Point 2
  - [ ] Actionable Point 3
  - [ ] Actionable Point 4
  - [ ] Actionable Point 5
`;
