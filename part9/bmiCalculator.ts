interface Values {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): Values => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    }
    if (args.length > 4) {
        throw new Error('Too many arguments');
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number) => {
    const helper: number = weight / Math.pow(height / 100, 2);
    if (helper < 18.4) {
        console.log("Underweight");
    } else if (helper >= 25) {
        console.log("Overweight");
    } else {
        console.log("Normal range");
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    calculateBmi(height, weight);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}