
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'uploads/coverArt-1769963615510.png');
const buffer = fs.readFileSync(filePath);

console.log('Use PDFKit?');
import PDFDocument from 'pdfkit';
try {
    const doc = new PDFDocument();
    doc.image(buffer, 0, 0);
    console.log("PDFKit image loaded successfully");
} catch (e) {
    console.error("PDFKit failed:", e.message);
}

console.log("Hex start:", buffer.subarray(0, 16).toString('hex'));
