import { cpus } from 'os'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { Worker } from 'worker_threads'

const currentDir = dirname(fileURLToPath(import.meta.url))

const workerFileName = 'worker.js'
const workerPath = join(currentDir, workerFileName)

const cpuCores = cpus().length

const createWorker = (dataToProcess) => (
    new Promise((resolve) => {
        const worker = new Worker(workerPath, { workerData: dataToProcess})
    
        worker.on('message', (data) => {
            resolve(data)
        })
    })
)

const fibNToStartFrom = 10

const performCalculations = async () => {
    const promises = []
    for (let i = 0; i < cpuCores; i++) {
        const dataToProcess = fibNToStartFrom + i

        const fibN = createWorker(dataToProcess)
        promises.push(fibN)
    } 


    const res = await Promise.all(promises)
    console.log('res', res)
    // Write your code here
};

await performCalculations();