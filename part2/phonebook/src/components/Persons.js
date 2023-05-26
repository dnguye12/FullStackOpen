const Persons = ({personsToShow, deleto}) => {
    return (
        <div>
        {personsToShow.map(p => <p>{p.name} : {p.number} <button onClick={() => deleto(p.id)}>Delete person</button></p>)}
      </div>
    )
}

export default Persons;