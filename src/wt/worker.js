import { parentPort, workerData } from 'worker_threads'

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const KNOWN_STATUS = {
    RESOLVED: 'resolved',
    ERROR: 'error'
}

const sendResult = () => {
    try {
        const result = nthFibonacci(workerData)
    
        parentPort.postMessage({
            status: KNOWN_STATUS.RESOLVED,
            value: result,
        })
    } catch {
        parentPort.postMessage({
            status: KNOWN_STATUS.ERROR,
            value: null,
        })
    }
};

sendResult();