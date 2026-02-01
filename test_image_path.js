
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simulate the controller logic
const UPLOADS_PATH = path.join(__dirname, 'server/uploads'); 
// Note: test script is in root, so server/uploads is correct from here if I run from root. 
// But let's mirror the controller exactly.

console.log("CWD:", process.cwd());

const targetFilename = "coverArt-1769963615510.png";

const possiblePaths = [
    path.join(process.cwd(), 'server', 'uploads', targetFilename),
    path.join(process.cwd(), 'uploads', targetFilename),
    path.resolve('server/uploads', targetFilename)
];

console.log("Checking paths:");
possiblePaths.forEach(p => {
    const exists = fs.existsSync(p);
    console.log(`- ${p}: ${exists ? 'EXISTS' : 'MISSING'}`);
    if (exists) {
        const stats = fs.statSync(p);
        console.log(`  Size: ${stats.size} bytes`);
    }
});
