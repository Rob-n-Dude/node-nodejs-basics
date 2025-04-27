const parseEnv = () => {
    const targetPrefix = 'RSS_'

    const envs = Object.entries(process.env).reduce((acc, [ key, value ]) => {
        if (!key.startsWith(targetPrefix)) {
            return acc
        }

        acc.push(`${key}=${value}`)
        return acc
    }, []).join('; ')

    console.log(envs)
};

parseEnv();