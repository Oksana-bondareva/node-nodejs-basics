import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    const errorMessage = 'FS operation failed';
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        console.log(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
};

await read();