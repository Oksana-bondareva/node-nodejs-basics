import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const hash = createHash('sha256');
    const stream = createReadStream(file);

    stream.on('data', (chunk) => {
        hash.update(chunk);
    });

    stream.on('end', () => {
        console.log(hash.digest('hex'));
    });
};

await calculateHash();