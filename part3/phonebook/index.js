require('dotenv').config()

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
const Person = require('./models/person');
const note = require('../notes/models/note');

const app = express();
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(p => {
        response.json(p)
    })
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const helper = phonebook.find(p => p.id === id);
    if (helper) {
        response.json(helper);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(p => {
        if (p) {
            response.json(p)
        } else {
            response.status(404).end();
        }
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => next(error))
})

app.get('/info', (request, response) => {
    response.send(
        `
        <div>
            <p>Phone book has info for ${phonebook.length} people</p>
            <p>${new Date().toUTCString()}</p>
        </div>
        `
    )
});


app.delete('api/persons/:id', (request, response, next) => {
    note.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
})

app.put('api/persons/:id', (request, response, next) => {
    const {name, number} = request.body;

    Person.findByIdAndUpdate(request.params.id, { name, number}, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => { response.json(updatedPerson) }).catch(error => next(error))
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }else if(error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)