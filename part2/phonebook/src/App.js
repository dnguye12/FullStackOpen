import { useState, useEffect } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

import services from './services/services'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    services.getAll().then(response => setPersons(response));
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
      const helper2 = persons.find(p => p.name === newName);
      if(helper2) {
        if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          const helper3 = {...helper2, number: newNumber};

          services.update(helper2.id, helper3).then(response => {
            setPersons(persons.map(p => p.id !== helper2.id ? p : response))
          });
          setNewName('');
          setNewNumber('');
        }
      }else {
        const helper = {
          name: newName,
          number: newNumber,
        }
        services.create(helper).then(response => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
        })
      }
    }
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  }

  const personsToShow = searchName.length === 0
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase()));

  const deletePerson = id => {
   const pee = persons.find(p => p.id === id);
   if(pee) {
    if(window.confirm("Do you want to delete " + pee.name)) {
      console.log("delete " + id);

    services.deletePerson(id).then(response => {
      setPersons(persons.filter(p => p.id !== id));
    }).catch(error => {
      alert(`The person was already deleted from server`);
      setPersons(persons.filter(p => p.id !== id));
    })
    }
   }
   
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange} />
      <h4>Add a new person</h4>
      <PersonForm newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleto={deletePerson}/>
    </div>
  )
}

export default App