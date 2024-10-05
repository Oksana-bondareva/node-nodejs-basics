import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createWriteStream } from 'fs';
import { stdin, stdout } from 'process';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const stream = createWriteStream(file, 'utf-8');
    stdout.write('Print your message: \n');
    createInterface(stdin).on('line', (message) => stream.write(message + '\n'));
};

await write();