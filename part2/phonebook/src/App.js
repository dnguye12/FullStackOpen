import { useState } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (newName.length === 0) {
      alert("No name given!");
    } else if (!newNumber) {
      alert("No number given!");
    } else {
      const helper2 = persons.filter(p => p.name === newName);
      if (helper2.length === 0) {
        const helper = {
          name: newName,
          number: newNumber,
          id: persons.length + 1
        }
        setPersons(persons.concat(helper));
        setNewName('');
        setNewNumber('');
      } else {
        alert(`${newName} is already added to the phonebook`);
      }
    }
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  }

  const personsToShow = searchName.length === 0
  ? persons
  : persons.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange}/>
      <h4>Add a new person</h4>
      <PersonForm newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App