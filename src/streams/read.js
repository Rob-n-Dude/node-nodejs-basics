import { fileURLToPath} from 'url'
import { dirname, join } from 'path';
import { createReadStream } from 'fs';

const fileToRead = './files/fileToRead.txt'

const fileToReadPath = join(dirname(fileURLToPath(import.meta.url)), fileToRead)

const read = async () => {
    return new Promise((resolve, reject) => {
        const fileStream = createReadStream(fileToReadPath)

        fileStream.on('end', () => {
            resolve()
        })

        fileStream.on('error', (e) => {
            reject(e)
        })

        fileStream.on('data', (chunk) => {
            process.stdout.write(chunk)
            process.stdout.write('\n')
        })
    })
};

await read();