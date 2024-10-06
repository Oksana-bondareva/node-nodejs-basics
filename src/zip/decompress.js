import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createReadStream, createWriteStream, unlink } from 'fs';
import { pipeline } from 'stream';
import { createGunzip } from 'zlib';
import { promisify } from 'util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const archive = join(__dirname, 'files', 'archive.gz');
const outputFile = join(__dirname, 'files', 'fileToCompress.txt');
const pipe = promisify(pipeline);
const unlinkArchive = promisify(unlink);

const decompress = async () => {
    const gunzip = createGunzip();
    const source = createReadStream(archive);
    const destination = createWriteStream(outputFile);

    try {
        await pipe(source, gunzip, destination);
        await unlinkArchive(archive);
        console.log('File decompressed');
    } catch (error) {
        console.error(error);
    }
};

await decompress();