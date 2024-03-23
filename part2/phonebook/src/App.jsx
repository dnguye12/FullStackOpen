import { useState, useEffect } from 'react'

import personService from './services/persons'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Numbers = ({ persons, filter, deletePerson }) => {
  return (
    <>
      <h3>Numbers</h3>
      {
        filter === ''
          ? persons.map(person => <p>{person.name} {person.number} <button onClick={() => { deletePerson(person.id, person.name) }}>delete</button></p>)
          : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <p>{person.name} {person.number} <button onClick={() => { deletePerson(person.id, person.name) }}>delete</button></p>)
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

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type === 'error' ? 'error' : 'success'}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notiMessage, setNotiMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

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
    const person = persons.find(p => p.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          id: person.id,
          name: person.name,
          number: newNumber
        }
        personService
          .update(person.id, personObject)
          .then(res => {
            setPersons(persons.map(p => p.id === person.id ? personObject : p))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(res => {
          setPersons(persons.concat(res))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(res => {
          setPersons(persons.filter((p) => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm addPerson={addPerson} newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} />
      <Numbers persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App