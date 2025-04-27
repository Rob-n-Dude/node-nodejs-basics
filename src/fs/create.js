import { open } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url)
const __dirname = dirname(currentFilePath)

const FILE_NAME = join(__dirname, './files/fresh.txt')
const CONTENT = 'I am fresh and young'

const ALREADY_EXISTED_FILE_ERROR_CODE = 'EEXIST'
const EXISTED_FILE_ERROR_MESSAGE = 'FS operation failed'

const create = async () => {
    try {
        const file = await open(FILE_NAME, 'wx')

        await file.write(CONTENT)

        await file.close()
    } catch (e) {
        if (e.code === ALREADY_EXISTED_FILE_ERROR_CODE) {
            throw new Error(EXISTED_FILE_ERROR_MESSAGE)
        }
    }
};

await create();