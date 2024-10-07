import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');
    const errorMessage = 'FS operation failed';
    const fileText = 'I am fresh and young';
    try {
        await fs.writeFile(filePath, fileText, { flag: 'wx' });
    } catch (error) {
        if (error.code === 'EEXIST') {
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
};

await create();