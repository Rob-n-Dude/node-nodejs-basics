import { fileURLToPath } from 'url'
import { dirname, join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

const currentDir = dirname(fileURLToPath(import.meta.url))

const sourceFile = './files/fileToCompress.txt'
const targetFile = './files/archive.gz'

const sourceFilePath = join(currentDir, sourceFile)
const targetFilePath=  join(currentDir, targetFile)

const compress = async () => {
    const readFileStream = createReadStream(sourceFilePath)
    const writeFileStream = createWriteStream(targetFilePath)

    const zipper = createGzip()

    readFileStream.pipe(zipper).pipe(writeFileStream)
};

await compress();