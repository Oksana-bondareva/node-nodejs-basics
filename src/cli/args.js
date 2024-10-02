const parseArgs = () => {
    const args = process.argv;
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            const propName = args[i].replace('--', '');
            const value = args[i + 1];
            console.log(`${propName} is ${value}`);
        }
    }
};

parseArgs();