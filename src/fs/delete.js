import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const remove = async () => {
    const filePath = join(__dirname, 'files', 'fileToRemove.txt');
    const errorMessage = 'FS operation failed';
    try {
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
};

await remove();