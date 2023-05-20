import { useState, useEffect } from 'react'

import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      console.log("Promised fulfilled");
      setPersons(response.data);
    })
  }, [])

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