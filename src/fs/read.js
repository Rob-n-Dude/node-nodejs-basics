import { open } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath} from 'url'
import { DEFAULT_ERROR_MESSAGE, ERROR_CODE } from './constants.js'

const currentDirPath = dirname(fileURLToPath(import.meta.url))

const targetFileDir = 'files'
const targetFileName =  'fileToRead.txt'

const read = async () => {
    try {
        const file = await open(join(currentDirPath, targetFileDir, targetFileName), 'r')
        const { buffer } = await file.read()

        const content = buffer.toString()

        console.log(content)
        await file.close()
    } catch (e) {
        if (e.code === ERROR_CODE.NO_SUCH_FILE) {
            throw new Error(DEFAULT_ERROR_MESSAGE)
        }
    }
};

await read();