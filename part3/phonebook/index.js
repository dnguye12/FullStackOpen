require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(res => {
        response.json(res)
    })
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', postMorgan, (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        response.status(404).json({
            error: 'name or number missing'
        }).end()
    } else if (persons.find(p => p.name === body.name)) {
        response.status(404).json({
            error: 'name must be unique'
        }).end()
    } else {
        const id = persons.length > 0
            ? Math.max(...persons.map(p => p.id)) + 1
            : 1
        const person = new Person({
            name: body.name,
            number: body.number
        })
        person.save().then(savedPerson => {
            persons = persons.concat(savedPerson)
            response.json(savedPerson)
        })
    }
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    Person.findByIdAndUpdate(request.params.id, person, {new : true})
    .then(updatedPerson => {
        response.json(updatedPerson)
        persons = persons.map(p => p.id === updatedPerson.id ? updatedPerson : p)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
