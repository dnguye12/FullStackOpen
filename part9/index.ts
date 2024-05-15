import express from 'express';
import qs from 'qs';
import calculateBmi from './bmiCalculator';

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})