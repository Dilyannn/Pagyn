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