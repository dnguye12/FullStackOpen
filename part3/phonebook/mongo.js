const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Not enough input, expected at least 3')
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://dnguye12:${password}@cluster0.cafeu4k.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', noteSchema);

let phonebook = [
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
];

/*

if (process.argv.length >= 5) {
    const inputName = process.argv[3];
    const inputTele = process.argv[4];

    const person = new Person({
        name: inputName,
        number: inputTele
    })

    person.save().then(result => {
        console.log("person saved");
        mongoose.connection.close();
    })
} else {
    console.log("PhoneBook :");
    Person.find({}).then(result => {
        result.forEach(p => console.log(p))
        mongoose.connection.close();
    })
}*/

let promise = phonebook.map(n => {
    const note = new Person({name: n.name, number: n.number});
    return note.save();
})

Promise.all(promise).then(result => {
    console.log('notes saved!')
    mongoose.connection.close()
})