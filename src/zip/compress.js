import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createReadStream, createWriteStream, unlink } from 'fs';
import { pipeline } from 'stream';
import { createGzip } from 'zlib';
import { promisify } from 'util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'files', 'fileToCompress.txt');
const output = join(__dirname, 'files', 'archive.gz');
const pipe = promisify(pipeline);
const unlinkFile = promisify(unlink);

const compress = async () => {
    const gzip = createGzip();
    const source = createReadStream(file);
    const destination = createWriteStream(output);

    try {
        await pipe(source, gzip, destination);
        await unlinkFile(file);
        console.log('File compressed');
    } catch (error) {
        console.error(error);
    }
};

await compress();