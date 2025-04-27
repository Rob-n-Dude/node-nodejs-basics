import { rename as fsRename} from 'fs/promises'
import { dirname, join } from 'path'
import {fileURLToPath} from 'url'
import { DEFAULT_ERROR_MESSAGE, ERROR_CODE } from './constants.js'

const currentPath = fileURLToPath(import.meta.url)
const currentDir = dirname(currentPath)

const filesDirectory = 'files'

const filesDirectoryPath = join(currentDir, filesDirectory)

const rename = async () => {
    try {
        const oldFileName = 'wrongFilename.txt'
        const newFileName=  'properFilename.md'
        await fsRename(join(filesDirectoryPath, oldFileName), join(filesDirectoryPath, newFileName))
    } catch (e) {
        if (e.code === ERROR_CODE.NO_SUCH_FILE) {
            throw new Error(DEFAULT_ERROR_MESSAGE)
        }
        console.log(e)
    }
};

await rename();