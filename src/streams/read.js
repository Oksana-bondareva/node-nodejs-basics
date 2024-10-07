import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createReadStream } from 'fs';
import { stdout } from 'process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const stream = createReadStream(file, 'utf-8');
    stream.on('data', (chunk) => stdout.write(chunk + '\n'))
};

await read();