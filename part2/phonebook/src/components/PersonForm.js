const PersonForm = ({newName, handleNewNameChange, newNumber, handleNewNumberChange, addPerson}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          Name : <input
            value={newName}
            onChange={handleNewNameChange}
          />
        </div>
        <div>
          Number : <input value={newNumber} onChange={handleNewNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm