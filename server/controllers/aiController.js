import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

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

    const nChapters = parseInt(numChapters) || 3;

    const prompt = `
      You are an expert book author and content creator. 
      Create a detailed book outline based on the following requirements:
      Topic: "${topic}"
      ${description ? `Description: ${description}` : ""}
      ${style ? `Style: ${style}` : ""}
      Number of chapters: ${nChapters}.
      
      Response format:
      1. Generate exactly ${nChapters} chapter titles.
      2. Each chapter title should be concise, engaging, also must be clear 
        and following best practices and logical progression.
      3. Each chapter description should be 2-3 sentences long, summarizing 
        the key points to be covered in that chapter.
      4. Make sure the chapters are built upon each other to create a 
        cohesive flow throughout the book.
      5. Match the tone and "${style || "standard"}" writing style in your titles and descriptions,
        if provided.
      6. Return ONLY A VALID JSON array with no additional text, markdown or formatting. 
        Each object MUST have exactly the following keys: "title" and "description" 
        like shown in the example.
      
      Example response format:
      [
        {
          "title": "Chapter 1: Introduction",
          "description": "..."
        }
      ]    

      Generate the book outline now:
      `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      return res.status(500).json({ message: "Empty response from AI" });
    }

    // find and extract the outline from the response
    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1) {
      console.error("Failed to parse outline from AI response, no JSON array found");
      return res.status(500).json({ message: "Failed to parse outline from AI response, no JSON array found" });
    }

    const jsonString = text.substring(startIndex, endIndex + 1);

    // Validate JSON format
    try {
      const outline = JSON.parse(jsonString);
      res.status(200).json({ outline });
    } catch (parseError) {
      console.error("Failed to parse outline from AI response, invalid JSON format", parseError);
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