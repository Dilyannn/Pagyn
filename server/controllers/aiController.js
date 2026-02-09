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
      model: "gemini-2.5-flash-lite", 
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
    const { chapterTitle, chapterDescription, style } = req.body;

    if (!chapterTitle) {
      return res.status(400).json({ message: "Chapter title is required" });
    }

    const prompt = `
      You are an expert writer specializing in ${style || "captivating content"} content.
      Write a detailed chapter based on the following requirements:

      Chapter Title: "${chapterTitle}"
      ${chapterDescription ? `Chapter Description: "${chapterDescription}"` : ""}
      ${style ? `Writing Style: ${style}` : ""}
      Target Length: Comprehensive and in-depth (1500 - 2000 words).
      The chapter should be well-structured, engaging, and informative.
      Use headings, subheadings, and examples where appropriate to enhance readability.
      Ensure the content flows logically and maintains the reader's interest throughout.

      Specific Instructions:
      1. Write in a ${style || "engaging tone and"} tone suitable for the specific style (${style || ""}) throughout the chapter.
      2. Break down the chapter into clear sections with appropriate headings with smooth transitions.
      3. Provide detailed explanations, examples, and insights relevant to the chapter topic, and or anecdotes as appropriate for the style.
      4. Ensure the content is original, entertaining, and it flows logically from beginning to the end.
      5. Match the tone and "${style || "standard"}" writing style${chapterDescription ? `, also cover all points mentioned in the chapter description` : ""} throughout the chapter.
    
      Format Guidelines:
      - Start with a compelling opening paragraph empathizing the chapter title and description.
      - Use subheadings to organize content into sections (build a clear paragraph breaks for readability).
      - Include subheading if appropriate for the content length.
      - End with a strong conclusion or Transition to the next chapter.
      - Write in PLAIN TEXT format ONLY, no markdown or special formatting.

      Generate the chapter content now.
      `;

    let response;
    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
        });
        break; // success
      } catch (apiErr) {
        const retryable = [429, 503].includes(apiErr.status);
        if (retryable && attempt < maxRetries) {
          console.log(`Gemini API error ${apiErr.status} (attempt ${attempt}/${maxRetries}), retrying in ${attempt * 3}s...`);
          await new Promise((r) => setTimeout(r, attempt * 3000));
        } else {
          throw apiErr;
        }
      }
    }

    res.status(200).json({ content: response.text });
  } catch (err) {
    console.error("Error generating chapter content:", err.message || err);
    const status = err.status || 500;
    let message;
    if (status === 503) {
      message = "The AI model is currently overloaded. Please try again in a moment.";
    } else if (status === 429) {
      message = "Too many requests. Please wait a moment and try again.";
    } else {
      message = err.message || "Server error due to failure in generating AI chapter content";
    }
    res.status(status).json({ message, details: err.message });
  }
};

export { generateOutline, generateChapterContent };