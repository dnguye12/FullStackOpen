interface calculateValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArguments2 = (args: string[]): number[] => {
    if (args.length < 3) {
        throw new Error('Not enough arguments');
    }
    if (args.length < 4) {
        throw new Error('Missing rating arguments');
    }
    let arr: number[] = [];
    for (let i: number = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        } else {
            arr.push(Number(args[i]));
        }
    }
    return arr;
}

const calculateExercises = (input: number[]): calculateValues => {
    const target: any = input.pop();

    const periodLength: number = input.length;
    let trainingDays: number = 0;
    let total: number = 0;
    for (let i: number = 0; i < periodLength; i++) {
        if (input[i] > 0) {
            trainingDays++;
            total += input[i];
        }
    }

    let average: number = total / periodLength;
    let success: boolean = target > average ? false : true;
    let rating: number = success ? 3 : total === 0 ? 1 : 2;
    let ratingDescription: string = '';
    switch (rating) {
        case 1:
            ratingDescription = '🤮';
            break;
        case 2:
            ratingDescription = '😐';
            break;
        case 3:
            ratingDescription = '👍';
            break;
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
}

try {
    const arr: number[] = parseArguments2(process.argv);
    console.log(calculateExercises(arr));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export default calculateExercises;