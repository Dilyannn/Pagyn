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

          paragraphs.push(
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
      } else if (token.type === "paragraph_open") {
        const nextToken = tokens[i + 1];

        if (nextToken && nextToken.type === "inline" && nextToken.children) {
          const textRuns = processInlineContent(nextToken.children);

          if (textRuns.length > 0) {
            paragraphs.push(
              new Paragraph({
                children: textRuns,
                spacing: {
                  before: inList ? 100 : DOCX_STYLES.spacing.paragraphBefore,
                  after: inList ? 100 : DOCX_STYLES.spacing.paragraphAfter,
                  line: 360, // 1.5 line spacing
                },
                alignment: AlignmentType.JUSTIFIED,
              });
            );
          }
          i += 2; // Skip the inline and closing tokens
        } 
      } else if (token.type === "bullet_list_open") {
        inList = true;
        listType = "bullet";
      } else if (token.type === "bullet_list_close") {
        inList = false;
        listType = null;

        // space after list
        paragraphs.push(
          new Paragraph({
            text: "",
            spacing: {
              after: 100,
            },
          });
        );
      } else if (token.type === "ordered_list_open") {
        inList = true;
        listType = "ordered";
        orderedCounter = 1;
      } else if (token.type === "ordered_list_close") {
        inList = false;
        listType = null;
        orderedCounter = 1;

        // space after list
        paragraphs.push(
          new Paragraph({
            text: "",
            spacing: {
              after: 100,
            },
          });
        );
      } else if (token.type === "list_item_open") {
        const nextToken = tokens[i + 1];
        
        if (nextToken && nextToken.type === "paragraph_open") {
          const inlineToken = tokens[i + 2];

          if (
            inlineToken && 
            inlineToken.type === "inline" && 
            inlineToken.children
          ) {
            const textRuns = processInlineContent(inlineToken.children);
            let bulletText = "";

            if (listType === "bullet") {
              bulletText = "• ";
            } else if (listType === "ordered") {
              bulletText = `${orderedCounter}. `;
              orderedCounter++;
            }

            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: bulletText,
                    font: DOCX_STYLES.fonts.body,
                  }),
                  ...textRuns,
                ],
                spacing: {
                  before: 50,
                  after: 50,
                },
                indent: {
                  left: 720, // Half inch
                },
              });
            );
            i += 4 // Skip to after the closing list item token
          }
        } 
      } else if (token.type === "blockquote_open") {
        // Find the blockquote content
        const nextToken = tokens[i + 1];

        if (nextToken && nextToken.type === "paragraph_open") {
          const inlineToken = tokens[i + 2];
          if (inlineToken && inlineToken.type === "inline") {
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: inlineToken.content,
                    italics: true,
                    color: "6A737D", // Gray color
                    font: DOCX_STYLES.fonts.body,
                  });
                ],
                spacing: {
                  before: 200,
                  after: 200,
                },
                indent: {
                  left: 720, // Half inch
                },
                alignment: AlignmentType.JUSTIFIED,
                border: {
                  left: {
                    color: "D1D5DA", // Light gray
                    space: 1,
                    style: "single",
                    size: 24,
                  },
                },
              });
            );
            i += 4; // Skip to after the closing blockquote token
          }
        }
      } else if (token.type === "code_block" || token.type === "fence") {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: token.content,
                font: "Courier New",
                size: 20,
                color: "333333", // Dark gray
              }),
            ],
            spacing: {
              before: 200,
              after: 200,
            },
            shading: {
              fill: "F5F5F5", // Light gray background
            },
          });
        );
      } else if (token.type === "hr") {
        paragraphs.push(
          new Paragraph({
            text: "",
            border: {
              bottom: {
                color: "CCCCCC", // Light gray
                space: 1,
                style: "single",
                size: 6,
              },
            },
            spacing: {
              before: 200,
              after: 200
            },
          });
        );
      } 
    } catch (tokenErr) {
      console.error("Error processing markdown token:", token, tokenErr);
      continue;
    }
  }

  return paragraphs;
};

//! Process inline content (bold, italics, text, links, etc.) to DOCX TextRuns
const processInlineContent = (inlineTokens) => {
  const textRuns = [];
  let currentFormatting = { bold: false, italics: false };
  let textBuffer = "";

  const flushTextBuffer = () => {
    if (textBuffer.trim()) {
      textRuns.push(
        new TextRun({
          text: textBuffer,
          bold: currentFormatting.bold,
          italics: currentFormatting.italics,
          font: DOCX_STYLES.fonts.body,
          size: DOCX_STYLES.sizes.body * 2, // docx uses half points
        });
      );
      textBuffer = "";
    }
  };

  children.forEach((token) => {
    if (token.type === "strong_open") {
      flushTextBuffer();
      currentFormatting.bold = true;
    } else if (token.type === "strong_close") {
      flushTextBuffer();
      currentFormatting.bold = false;
    } else if (token.type === "em_open") {
      flushTextBuffer();
      currentFormatting.italics = true;
    } else if (token.type === "em_close") {
      flushTextBuffer();
      currentFormatting.italics = false;
    } else if (token.type === "text") {
      textBuffer += token.content;
    }
  });

  flushTextBuffer();
  return textRuns;
};

//! Export book as DOCX
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

const TYPOGRAPHY = {
  fonts: {
    serif: "Times-Roman",
    serifBold: "Times-Bold",
    serifItalic: "Times-Italic",
    sans: "Helvetica",
    sansBold: "Helvetica-Bold",
    sansOblique: "Helvetica-Oblique",
  },
  sizes: {
    title: 28,
    author: 16,
    chapterTitle: 22,
    h1: 18,
    h2: 16,
    h3: 14,
    body: 12,
    caption: 10,
  },
  spacing: {
    text: "#333333", // Standard text color
    heading: "#1A202C", // Darker color for headings
    accent: "#4F46E5", // Accent color (blue)
  },
}; 

const renderInlineTokens = (doc, tokens, options = {}) => {
  if (!tokens || tokens.length === 0) {
    return;
  }

  const baseOptions = {
    align: options.align || "justify",
    indent: options.indent || 0,
    lineGap: options.lineGap || 2,
  };

  let currentFont = TYPOGRAPHY.fonts.serif;
  let textBuffer = "";

  const flushTextBuffer = () => {
    if (textBuffer) {
      doc.font(currentFont).text(textBuffer, {
        ...baseOptions,
        continued: true,
      }); // Add baseOptions if needed
      textBuffer = "";
    }
  };

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === "text") {
      textBuffer += token.content;
    } else if (token.type === "strong_open") {
      flushTextBuffer();
      currentFont = TYPOGRAPHY.fonts.serifBold;
    } else if (token.type === "strong_close") {
      flushTextBuffer();
      currentFont = TYPOGRAPHY.fonts.serif;
    } else if (token.type === "em_open") {
      flushTextBuffer();
      currentFont = TYPOGRAPHY.fonts.serifItalic;
    } else if (token.type === "em_close") {
      flushTextBuffer();
      currentFont = TYPOGRAPHY.fonts.serif;
    } else if (token.type === "code_inline") {
      flushTextBuffer();
      doc
        .font("Courier")
        .text(token.content, {
          ...baseOptions,
          continued: true,
        });
      doc.font(currentFont); // revert to previous font  
    }
  }

  if (textBuffer) {
    doc.font(currentFont).text(textBuffer, {
      ...baseOptions,
      continued: false,
    });
  } else {
    doc.text("", { continued: false });
  }
};

const renderMarkdown = (doc, markdown) => {
  if (!markdown || !markdown.trim() === "") {
    return;
  }

  const tokens = md.parse(markdown, {});
  let inList = false;
  let listType = null; // "ordered" or "bullet"
  let orderedCounter = 1;

  for (let i = 0; i < tokens.lengtj; i++) {
    const token = tokens[i];

    try {
      if (token.type === "heading_open") {
        const level = parseInt(token.tag.substring(1), 10); // 'h1' -> 1
        let fontSize;

        switch (level) {
          case 1:
            fontSize = TYPOGRAPHY.sizes.h1;
            break;
          case 2:
            fontSize = TYPOGRAPHY.sizes.h2;
            break;  
          case 3:
            fontSize = TYPOGRAPHY.sizes.h3;
            break;
          default:
            fontSize = TYPOGRAPHY.sizes.h3;  
        }

        doc.moveDown(
          TYPOGRAPHY.spacing.headingSpacing.before / TYPOGRAPHY.sizes.body // convert to lines
        );

        doc
          .font(TYPOGRAPHY.fonts.sansBold)
          .fontSize(fontSize)
          .fillColor(TYPOGRAPHY.color.heading);

        if (i + 1 < tokens.length && tokens[i + 1].type === "inline") {
          renderInlineTokens(doc, tokens[i + 1].children, {
            align: "left",
            lineGap: 0,
          });
          i++;
        }

        doc.moveDown(
          TYPOGRAPHY.spacing.headingSpacing.after / TYPOGRAPHY.sizes.body // convert to lines
        );

        if (i + 1 < tokens.length && tokens[i + 1].type === "heading_close") {
          i++;
        }
      } else if (token.type === "paragraph_open") {
        doc
          .font(TYPOGRAPHY.fonts.serif)
          .fontSize(TYPOGRAPHY.sizes.body)
          .fillColor(TYPOGRAPHY.color.text);
        
        if (i + 1 < tokens.length && tokens[i + 1].type === "inline") {
          renderInlineTokens(doc, tokens[i + 1].children, {
            align: "justify",
            lineGap: 2,
          });
          i++;
        }

        if (!inList) {
          doc.moveDown(
            TYPOGRAPHY.spacing.paragraphSpacing / TYPOGRAPHY.sizes.body // convert to lines
          );
        }

        if (i + 1 < tokens.length && tokens[i + 1].type === "paragraph_close") {
          i++;
        }
      } else if (token.type === "bullet_list_open") {
        inList = true;
        listType = "bullet";
        doc.moveDown(
          TYPOGRAPHY.spacing.listSpacing / TYPOGRAPHY.sizes.body // convert to lines
        );
      } else if (token.type === "bullet_list_close") {
        inList = false;
        listType = null;
        doc.moveDown(
          TYPOGRAPHY.spacing.listSpacing / TYPOGRAPHY.sizes.body // convert to lines
        );
      } else if (token.type === "ordered_list_open") {
        inList = true;
        listType = "ordered";
        orderedCounter = 1;
        doc.moveDown(
          TYPOGRAPHY.spacing.listSpacing / TYPOGRAPHY.sizes.body // convert to lines
        );
      } else if (token.type === "ordered_list_close") {
        inList = false;
        listType = null;
        orderedCounter = 1;
        doc.moveDown(
          TYPOGRAPHY.spacing.listSpacing / TYPOGRAPHY.sizes.body // convert to lines
        );
      } else if (token.type === "list_item_open") {
        let bullet = "";

        if (listType === "bullet") {
          let bullet = "• ";
        } else if (listType === "ordered") {
          bullet = `${orderedCounter}. `;
          orderedCounter++;
        }

        doc
          .font(TYPOGRAPHY.fonts.serif)
          .fontSize(TYPOGRAPHY.sizes.body)
          .fillColor(TYPOGRAPHY.color.text)

        doc.text(bullet, { indent: 20, continued: true });

        for (let j = i + 1; j < tokens.length; j++) {
          if (tokens[j].type === "inline" && tokens[j].children) {
            renderInlineTokens(doc, tokens[j].children, {
              align: "left",
              lineGap: 2,
            });
            break;
          } else if (tokens[j].type === "list_item_close") {
            break;
          }
        }
        
        doc.moveDown(
          TYPOGRAPHY.spacing.paragraphSpacing / TYPOGRAPHY.sizes.body // convert to lines
        );
      } else if (token.type === "code_block" || token.type === "fence") {
        doc.moveDown(
          TYPOGRAPHY.spacing.paragraphSpacing / TYPOGRAPHY.sizes.body // convert to lines
        );

        doc
          .font("Courier")
          .fontSize(9)
          .fillColor(TYPOGRAPHY.color.text)
          .text(token.content, {
            indent: 20,
            align: "left",
          });

        doc.font(TYPOGRAPHY.font.serif).fontSize(TYPOGRAPHY.sizes.body);

        doc.moveDown(
          TYPOGRAPHY.spacing.paragraphSpacing / TYPOGRAPHY.sizes.body // convert to lines
        );  
      } else if (token.type === "hr") {
        doc.moveDown();
        cont y = doc.y;

        doc
          .moveTo(doc.page.margins.left, y);
          .lineTo(doc.page.width - doc.page.margins.right, y)
          .stroke();

        doc.moveDown();  
      }
    } catch (tokenErr) {
      console.error("Error processing token:", token.type, tokenError);
      continue;
    }
  }
};

const exportAsPdf = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized access to this book" });
    }

    //? Create PDF with safe settings
    const doc = new PDFDocument({
      margins: {top: 72, bottom: 72, left: 72, right: 72}, // 1 inch margins
      bufferPages: true,
      autoFirstPage: true,
    });

    //? Set headers before piping
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${book.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf"`
    );

    doc.pipe(res);

    //? Render Cover Page if available
    if (book.coverArt && !book.coverArt.includes("pravatar")) {
      const coverImagePath = book.coverArt.substring(1);

      try {
        if (fs.existsSync(coverImagePath)) {
          const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
          const pageHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

          doc.image(coverImagePath, doc.page.margins.left, doc.page.margins.top, {
            fit: [pageWidth * 0.8, pageHeight * 0.8],
            align: "center",
            valign: "center",
          });
          doc.addPage();
        }
      } catch (imgageErr) {
        console.error(`Error including cover image in PDF export from: ${coverImagePath}`, imgageErr);
      }
    }

    //? Render Title Page
    doc
      .font(TYPOGRAPHY.font.sansBold)
      .fontSize(TYPOGRAPHY.size.title)
      .fillColor(TYPOGRAPHY.color.heading)
      .text(book.title, { align: "center" });

    doc.moveDown(2);

    if (book.subtitle && book.subtitle.trim()) {
      doc
        .font(TYPOGRAPHY.font.sans)
        .fontSize(TYPOGRAPHY.size.h2)
        .fillColor(TYPOGRAPHY.color.text)
        .text(book.subtitle, { align: "center" });
      
      doc.moveDown(1);
    }

    doc
      .font(TYPOGRAPHY.font.sans)
      .fontSize(TYPOGRAPHY.size.author)
      .fillColor(TYPOGRAPHY.color.text)
      .text(book.author, { align: "center", lineGap: 10 });

    //? Process Chapters
    if (book.chapters && book.chapters.length > 0) {
      book.chapters.forEach((chapter, index) => {
        try {
          doc.addPage();

          //? Chapter Title
          doc
            .font(TYPOGRAPHY.font.sansBold)
            .fontSize(TYPOGRAPHY.size.chapterTitle)
            .fillColor(TYPOGRAPHY.color.heading)
            .text(chapter.title || `Chapter ${index + 1}`, { align: "left" });
          
          doc.moveDown(TYPOGRAPHY.spacing.chapterSpacing / TYPOGRAPHY.sizes.body);

          //? Chapter Content
          if (chapter.content && chapter.content.trim()) {
            renderMarkdown(doc, chapter.content);
          }
        } catch (err) {
          console.error(`Error processing chapter "${index}" for PDF export:`, err);
        }
      });
    }  

    //? Finalize PDF and end the stream
    doc.end();
  } catch (err) {
    console.error("PDF Export Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ 
        message: "Server error during PDF export", 
        details: err.message 
      });
    }
  }
};

export { exportAsDocx, exportAsPdf };