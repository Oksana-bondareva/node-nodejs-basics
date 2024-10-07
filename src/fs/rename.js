import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rename = async () => {
    const filePath = join(__dirname, 'files', 'wrongFilename.txt');
    const filePathRename = join(__dirname, 'files', 'properFilename.md');
    const errorMessage = 'FS operation failed';
    try {
        await fs.rename(filePath, filePathRename);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
};

await rename();