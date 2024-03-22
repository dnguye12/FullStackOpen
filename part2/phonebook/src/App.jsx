import { useState } from 'react'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Numbers = ({ persons, filter }) => {
  return (
    <>
      <h3>Numbers</h3>
      {
        filter === ''
          ? persons.map(person => <p>{person.name} {person.number}</p>)
          : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <p>{person.name} {person.number}</p>)
      }
    </>
  )
}

const PersonForm = ({ addPerson, newName, handleNewNameChange, newNumber, handleNewNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <h3>add a new</h3>
        name: <input value={newName} onChange={handleNewNameChange} />
        number: <input value={newNumber} onChange={handleNewNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm addPerson={addPerson} newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} />
      <Numbers persons={persons} filter={filter} />
    </div>
  )
}

export default App