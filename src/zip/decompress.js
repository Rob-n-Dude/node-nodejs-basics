import { fileURLToPath } from 'url'
import { dirname, join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';

const currentDir = dirname(fileURLToPath(import.meta.url))

const targetFile = './files/fileToCompress.txt'
const sourceFile = './files/archive.gz'

const targetFilePath = join(currentDir, targetFile)
const sourceFilePath = join(currentDir, sourceFile)

const decompress = async () => {
    const readStream = createReadStream(sourceFilePath)
    const writeToFileStream = createWriteStream(targetFilePath)

    const decode = createGunzip()

    readStream.pipe(decode).pipe(writeToFileStream)
};

await decompress();