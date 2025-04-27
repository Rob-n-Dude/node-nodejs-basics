const isArg = (string) => {
    return string.startsWith('--')
}

const parseArgs = () => {
    const args = process.argv.slice(2)

    const argIndexes = args.reduce((a, c, i) => {
        if (!isArg(c)) {
            return a
        }

        a.push(i)
        return a
    }, [])

    return argIndexes.map((index) => {
        const argName = args[index]
        const argValue = args[index + 1]

        if (!argValue) {
            return
        }

        return `${argName} is ${argValue}`
    }).filter(Boolean).join(', ')
};

parseArgs();