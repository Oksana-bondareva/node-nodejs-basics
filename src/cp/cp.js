import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const childProcess = spawn('node', [file, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);

    childProcess.on('error', (error) => {
        console.error('Failed to start child:', error);
    });

    childProcess.on('close', (code) => {
        console.log(`Child exited with code ${code}`);
    });
};

spawnChildProcess(['someArgument1', 'someArgument2']);
