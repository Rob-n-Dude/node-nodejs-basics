import { open } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_ERROR_MESSAGE, ERROR_CODE } from './constants';

const currentFilePath = fileURLToPath(import.meta.url)
const __dirname = dirname(currentFilePath)

const FILE_NAME = join(__dirname, './files/fresh.txt')
const CONTENT = 'I am fresh and young'

const create = async () => {
    try {
        const file = await open(FILE_NAME, 'wx')

        await file.write(CONTENT)

        await file.close()
    } catch (e) {
        if (e.code === ERROR_CODE.ALREADY_EXISTED_FILE) {
            throw new Error(DEFAULT_ERROR_MESSAGE)
        }
    }
};

await create();