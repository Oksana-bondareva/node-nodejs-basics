import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Worker } from 'worker_threads';
import { cpus } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerFile = join(__dirname, 'worker.js');

const performCalculations = async () => {
    const cores = cpus().length;
    const startingNumber = 10;

    const createWorker = (index) => {
        return new Promise((resolve) => {
            const worker = new Worker(workerFile);
            worker.on('message', (data) => {
                resolve({ status: 'resolved', data });
            });
            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });
            worker.postMessage(startingNumber + index);
        });
    };

    const workerPromises = [];
    for (let i = 0; i < cores; i++) {
        workerPromises.push(createWorker(i));
    }

    const workerResults = await Promise.all(workerPromises);
    console.log(workerResults);
};

await performCalculations();