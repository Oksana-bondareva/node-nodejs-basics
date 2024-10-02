import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
    const errorMessage = 'FS operation failed';
    try {
        await fs.access(`${__dirname}/files`);
        try {
            await fs.access(`${__dirname}/files_copy`);
            throw new Error(errorMessage);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
        await fs.cp(`${__dirname}/files`, `${__dirname}/files_copy`, { recursive: true });
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(errorMessage);
        } else {
            throw error;
        }
    }
};

await copy();
