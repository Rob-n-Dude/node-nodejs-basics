import { Transform } from 'stream'

const reverseTransform = new Transform({
    transform: (data, encoding, callback) => {
        const chunk = data.toString()

        const withoutEndings = chunk.replace(/[\r\n]+/g, '');

        const reversed = withoutEndings.split('').reverse().join('') + '\n'
        callback(null, reversed)
    }
})

const transform = async () => {
    process.stdin.pipe(reverseTransform).pipe(process.stdout)
};

await transform();