import { fileURLToPath} from 'url'
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';
import { DEFAULT_ERROR_MESSAGE, ERROR_CODE } from './constants.js';

const currentDirPath = dirname(fileURLToPath(import.meta.url))

const sourceFolder = 'files'

const list = async () => {
    try {
        const files = await readdir(join(currentDirPath, sourceFolder))

        for await(const fileName of files) {
            console.log('fileName: %s', fileName)
        }
    } catch (e) {
        if (e.code === ERROR_CODE.NO_SUCH_FILE) {
            throw new Error(DEFAULT_ERROR_MESSAGE)
        }
    }
};

await list();