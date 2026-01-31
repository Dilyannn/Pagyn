import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  UnderlineType,
  ImafeRun,
} from "docx";
import PDFDocument from "pdfkit";
import MarkdownIt from "markdown-it";
import fs from "fs";
import path from "path";
import Book from "../models/Book.js";

const md = new MarkdownIt();

const DOCX_STYLES = {
  fonts: {
    body: {
      normal: "Austin",
      bold: "Austin Bold",
      italics: "Austin Italic",
      bolditalics: "Austin Bold Italic",
    },
    heading: "Inter",
  },
  sizes: {
    title: 32,
    subtitle: 20,
    author: 18,
    chapterTitle: 24,
    h1: 20,
    h2: 18,
    h3: 16,
    body: 12,
  },
  spacing: {
    paragraphBefore: 200,
    paragraphAfter: 200,
    chapterBefore: 400,
    chapterAfter: 300,
    headingBefore: 300,
    headingAfter: 150,
  },
};

//! Process Markdown content to DOCX paragraphs
const processMarkdownToDocx = (markdown) => {
  const tokens = md.parse(markdown, {});
  const paragraphs = [];

  let inList = false;
  let listType = null; // "ordered" or "bullet"
  let orderedCounter = 1;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    try {
      if (token.Type === "heading_open") {
        const level = parseInt(token.tag.substring(1), 10); // 'h1' -> 1
        const nextToken = tokens[i + 1];

        if (nextToken && nextToken.type === "inline") {
          let headingLevel;
          let fontSize;

          switch (level) {
            case 1: 
              headingLevel = HeadingLevel.HEADING_1;
              fontSize = DOCX_STYLES.sizes.h1;
              break;
            case 2:
              headingLevel = HeadingLevel.HEADING_2;
              fontSize = DOCX_STYLES.sizes.h2;
              break;
            case 3: 
              headingLevel = HeadingLevel.HEADING_3;
              fontSize = DOCX_STYLES.sizes.h3;
              break;
            default:
              headingLevel = HeadingLevel.HEADING_3;
              fontSize = DOCX_STYLES.sizes.h3;    
          }

            new Paragraph({
              text: nextToken.content,
              heading: headingLevel,
              spacing: {
                before: DOCX_STYLES.spacing.headingBefore,
                after: DOCX_STYLES.spacing.headingAfter,
              },
              style: {
                font: DOCX_STYLES.fonts.heading,
                size: fontSize * 2, // docx uses half points
              },
            });
          );
          i += 2; // Skip the inline and closing tokens
        }


const exportAsDocx = async (book) => {
  try { 
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized access to this book" });
    }

    const sections = [];

    //* Cover Page if available
    const coverPage = [];

    if (book.coverArt && !book.coverArt.includes("pravatar") {
      const coverImagePath = book.coverArt.substring(1);

      try {
        if (fs.existsSync(coverImagePath)) {
          const imageBuffer = fs.readFileSync(coverImagePath);

          //? add top spacing
          coverPage.push(
            new Paragraph({
              text: "",
              spacing: {
                before: 1000
              },
            });
          );

          //? add image (centered)
          coverPage.push(
            new Paragraph({
              children: [
                new ImageRun({
                  data: imageBuffer,
                  transformation: {
                    width: 400,
                    height: 550,
                  },
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: {
                before: 200,
                after: 400,
              },
            });
          );

          //? BR after image
          coverPage.push(
            new Paragraph({
              text: "",
              pageBreakBefore: true,
            });
          );
        }
      } catch (imgageErr) {
        console.error(`Error including cover image in DOCX export from: ${coverImagePath}`, imgageErr);
      }
    }  

    sections.push(...coverPage);

    //* Title Page
    const titlePage = [];

    //? Title (main)
    titlePage.push(
      new Paragraph({
        children: [
          new TextRun({
            text: book.title,
            bold: true,
            font: DOCX_STYLES.fonts.heading,
            size: DOCX_STYLES.sizes.title * 2,
            color: "1A202C", // Dark Gray
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: {
          before: 2000,
          after: 400,
        },
      });
    );

    //? Subtitle (if any)
    if (book.subtitle && book.subtitle.trim()) {
      titlePage.push(
        new Paragraph({
          children: [
            new TextRun({
              text: book.subtitle,
              font: DOCX_STYLES.fonts.heading,
              size: DOCX_STYLES.sizes.subtitle * 2,
              color: "4A5568", // Medium Gray
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 400,
          },
        });
      );
    }

    //? Author
    titlePage.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `by ${book.author}`,
            font: DOCX_STYLES.fonts.heading,
            size: DOCX_STYLES.sizes.author * 2,
            color: "2D3748", // Dark Gray
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 200,
        },
      });
    );

    //? Line (optional)
    titlePage.push(
      new Paragraph({
        text: "",
        border: {
          bottom: {
            color: "CBD5E0", // Light Gray
            space: 1,
            style: "single",
            size: 12,
          },
        },
        alignment: AlignmentType.CENTER,
        spacing: {
          before: 400,
        },
      });
    );

    sections.push(...titlePage);

    //* Chapters 
    book.chapters.forEach((chapter, index) => {
      try {
        //? BR before chapter (excluding first chapter)
        if (index > 0) {
          sections.push(
            new Paragraph({
              text: "",
              pageBreakBefore: true,
            });
          );
        }

        //? Chapter Title
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: chapter.title,
                bold: true,
                font: DOCX_STYLES.fonts.heading,
                size: DOCX_STYLES.sizes.chapterTitle * 2,
                color: "1A202C", // Dark Gray
              }),
            ],
            spacing: {
              before: DOCX_STYLES.spacing.chapterBefore,
              after: DOCX_STYLES.spacing.chapterAfter,
            },
          });
        );

        //? Chapter Content (Markdown to DOCX)
        const contentP = processMarkdownToDocx(chapter.content || "");
        sections.push(...contentP);
      } catch (err) {
        console.error(`Error processing chapter "${index}" for DOCX export:`, err);
      }
    });

    //! Create Document
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: sections,
        },
      ],
    });

    // Generate the DOCX file buffer
    comst buffer = await Packer.toBuffer(doc);

    // send the buffer as a downloadable file (document)
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${book.title.replace(/[^a-zA-Z0-9]/g, '_')}.docx"`
    );
    res.setHeader(
      "Content-Length",
      buffer.length
    );
    res.send(buffer);
  } catch (err) {
    console.error("DOCX Export Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ 
        message: "Server error during DOCX export", 
        details: err.message 
      });
    }
  }
};