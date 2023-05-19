const Persons = ({personsToShow}) => {
    return (
        <div>
        {personsToShow.map(p => <p>{p.name} : {p.number}</p>)}
      </div>
    )
}

export default Persons;