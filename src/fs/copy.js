import { fileURLToPath} from 'url'
import { dirname, join } from 'path';
import { copyFile, mkdir, readdir } from 'fs/promises';

const currentFilePath = fileURLToPath(import.meta.url)
const __dirname = dirname(currentFilePath)

const targetDirName = 'files_copy'
const sourceDirName = 'files'

const ALREADY_EXISTED_FILE_ERROR_CODE = 'EEXIST'
const EXISTED_FILE_ERROR_MESSAGE = 'FS operation failed'

const NO_SUCH_FILE_ERROR = 'ENOENT'

const copy = async () => {
    try {
        await mkdir(join(__dirname, targetDirName))

    } catch (e) {
        if (e.code === ALREADY_EXISTED_FILE_ERROR_CODE) {
            throw new Error(EXISTED_FILE_ERROR_MESSAGE)
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
        if (e.code === NO_SUCH_FILE_ERROR) {
            throw new Error(EXISTED_FILE_ERROR_MESSAGE)
        }
    }
};

await copy();
