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



