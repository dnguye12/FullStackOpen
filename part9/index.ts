import express from 'express';
import qs from 'qs';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
    const query = qs.parse(_req.query as unknown as string);

    const height = Number(query.height);
    const weight = Number(query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.send({
            error: "malformatted parameters"
        });
    }

    res.send({
        'weight': weight,
        'height': height,
        'bmi': calculateBmi(weight, height)
    })
});

app.get('exercises', (_req, res) => {
    const query = qs.parse(_req.query as unknown as string);

    const daily_exercises:number[] = query.daily_exercises ? (Array.isArray(query.daily_exercises) ? query.daily_exercises.map(Number) : [Number(query.daily_exercises)]) : [];
    const target:number = Number(query.target);

    if (!Array.isArray(daily_exercises) || isNaN(target)) {
        res.send({
            error: "parameters missing"
        });
    }
    daily_exercises.push(target);
    res.send(calculateExercises(daily_exercises));
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})