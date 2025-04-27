import { fileURLToPath  } from 'url'
import { dirname, join } from 'path';
import { createHash } from 'crypto'
import { createReadStream } from 'fs';

const currentDir = dirname(fileURLToPath(import.meta.url))

const targetFile = './files/fileToCalculateHashFor.txt'
const targetFilePath = join(currentDir, targetFile)

const ALG = 'SHA256'

const calculateHash = async () => {
    return new Promise((resolve, reject) => {
        const fileStream = createReadStream(targetFilePath)
        const hash = createHash(ALG)
    
        fileStream.on('data', (data) => {
            hash.update(data)
        })
    
        fileStream.on('end', () => {
            const hashResult = hash.digest('hex')
            console.log('hash:', hashResult)

            resolve(hashResult)
        })
    
        fileStream.on('error', (error) => {
            reject(error)
        })
    })
};


await calculateHash();