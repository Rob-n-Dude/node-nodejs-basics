import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { rm } from "fs/promises";
import { DEFAULT_ERROR_MESSAGE, ERROR_CODE } from "./constants.js";

const currentDir = dirname(fileURLToPath(import.meta.url))

const targetDirectory = 'files'
const targetDirectoryPath = join(currentDir, targetDirectory)

const targetFileName = 'fileToRemove.txt'

const remove = async () => {
    try {
        await rm(join(targetDirectoryPath, targetFileName))
    } catch (e) {
        if (e.code === ERROR_CODE.NO_SUCH_FILE) {
            throw new Error(DEFAULT_ERROR_MESSAGE)
        }
    }
};

await remove();