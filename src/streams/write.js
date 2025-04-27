import { createWriteStream } from 'fs'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const targetFile = './files/fileToWrite.txt'

const targetFilePath = join(dirname(fileURLToPath(import.meta.url)), targetFile)

const write = async () => {
    const writableStream = createWriteStream(targetFilePath)

    process.stdin.pipe(writableStream)
};

await write();