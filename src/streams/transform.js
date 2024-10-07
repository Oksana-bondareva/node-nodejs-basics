import { Transform } from 'stream';
import { stdin, stdout } from 'process';

const reverseTransform = new Transform({
    transform(chunk, _, callback) {
      this.push(chunk.toString().split('').reverse().join(''));
      callback();
    }
  });

const transform = async () => {
    stdout.write('Print your message: \n');
    stdin.pipe(reverseTransform).pipe(stdout);
};

await transform();