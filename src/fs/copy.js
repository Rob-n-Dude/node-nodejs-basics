import { fileURLToPath} from 'url'
import { dirname, join } from 'path';
import { copyFile, mkdir, readdir } from 'fs/promises';
import { ERROR_CODE } from './constants.js';

const currentFilePath = fileURLToPath(import.meta.url)
const __dirname = dirname(currentFilePath)

const targetDirName = 'files_copy'
const sourceDirName = 'files'

const copy = async () => {
    try {
        await mkdir(join(__dirname, targetDirName))

    } catch (e) {
        if (e.code === ERROR_CODE.ALREADY_EXISTED_FILE) {
            throw new Error(DEFAULT_ERROR_MESSAGE)
        }
    }

    try {
        const sourceFiles = await readdir(join(__dirname, sourceDirName))

        for await(const fileName of sourceFiles) {
            const sourcePath = join(__dirname, sourceDirName, fileName)
            const targetPath = join(__dirname, targetDirName, fileName)

            await copyFile(sourcePath, targetPath)
        }
    } catch (e) {
        if (e.code === ERROR_CODE.NO_SUCH_FILE) {
            throw new Error(DEFAULT_ERROR_MESSAGE)
        }
    }
};

await copy();
