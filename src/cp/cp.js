import { fileURLToPath} from 'url'
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const currentDir = dirname(fileURLToPath(import.meta.url))

const childScriptFile = './files/script.js'

const childScriptFilePath = join(currentDir, childScriptFile)

const spawnChildProcess = async (args) => {
    const childProcess = spawn('node', [childScriptFilePath, ...args], {
        stdio: ['pipe', 'pipe'],
    })

    childProcess.on('exit', () => {
        console.log('Child process terminated')
    })

    process.stdin.pipe(childProcess.stdin)
    childProcess.stdout.pipe(process.stdout)
};

spawnChildProcess(['arg1', 'arg2']);

