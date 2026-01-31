import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

/**
 * @desc Generate a book outline using AI
 * @route POST /api/ai/book-outline
 * @access Private
 */
const generateOutline = async (req, res) => {
  try { 
    const { topic, style, numChapters, description } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const prompt = `
      You are an expert book author and content creator. 
      Create a detailed book outline based on the following requirements:
      Topic: "${topic}"
      ${description ? `Description: ${description}` : ""}
      ${style ? `Style: ${style}` : ""}
      ${numChapters ? `Number of chapters: ${numChapters}` : ""}.
      
      Response format:
      1. Generate exactly ${numChapters || 5} chapter titles.
      2. Each chapter title should be concise, engaging, also must be clear 
        and following best practices and logical progression.
      3. Each chapter description should be 2-3 sentences long, summarizing 
        the key points to be covered in that chapter.
      4. Make sure the chapters are built upon each other to create a 
        cohesive flow throughout the book.
      5. Match the tone and "${style}" writing style in your titles and descriptions,
        if provided.
      6. Return ONLY A VALID JSON array with no additional text, markdown or formating. 
        Each object MUST have exactly the following keys: "title" and "description" 
        like shown in the example.
      
      Example response:
      [
        {
          "title": "Chapter 1: Introduction to the Topic",
          "description": "This chapter provides an overview of the topic, its significance, and what readers can expect to learn."
        },
        {
          "title": "Chapter 2: Deep Dive into Key Concepts",
          "description": "This chapter explores the fundamental concepts in detail, providing examples and case studies to illustrate key points."
        }
      ]    

      Generate the book outline now:
      `;

      const text = response.text;

      // find and extract the outline from the response
      const startIndex = text.indexOf("[");
      const endIndex = text.lastIndexOf("]");

      if (startIndex === -1 || endIndex === -1) {
        return res.status(500).json({ message: "Failed to parse outline from AI response, no JSON array found" });
      }

      const jsonString = text.substring(startIndex, endIndex + 1);

      // Validate JSON format
      try {
        const outline = JSON.parse(jsonString);
        res.status(200).json({ outline });
      } catch (parseError) {
        return res.status(500).json({ message: "Failed to parse outline from AI response, invalid JSON format", details: parseError.message });
      }

  } catch (err) {
    console.error("Error generating book outline:", err);
    res.status(500).json({ message: "Server error due to failure in generating AI book outline", details: err.message });
  }
};

/**
 * @desc Generate a chapter content using AI
 * @route POST /api/ai/generate-chapter-content
 * @access Private
 */
const generateChapterContent = async (req, res) => {
  try { 

  } catch (err) {
    console.error("Error generating chapter content:", err);
    res.status(500).json({ message: "Server error due to failure in generating AI chapter content", details: err.message });
  }
};

export { generateOutline, generateChapterContent };