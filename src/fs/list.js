import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const list = async () => {
    const dirPath = join(__dirname, 'files');
    const errorMessage = 'FS operation failed';
    try {
        const files = await fs.readdir(dirPath);
        for (const file of files)
            console.log(file);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
};

await list();