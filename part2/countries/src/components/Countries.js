const Countries = ({ show, search, showCountry }) => {
    if (show.length === 0) {
        if (search === null || search.length === 0) {
            return (
                <p>Use the search bar for a country.</p>
            )
        } else {
            return (
                <p>No result found for your filter.</p>
            )
        }
    } else if (show.length > 10) {
        return (
            <p>Too many matches, specify another filter.</p>
        )
    } else if(show.length === 1) {
        const helper = show[0];
        return (
            <div>
                <h1>{helper.name.common}</h1>
                <p>Capital : {helper.capital}</p>
                <p>Area : {helper.area}</p>

                <h3>Language</h3>
                <ul>
                {Object.values(helper.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
                </ul>
                <img src={helper.flags.svg}/>
            </div>
        )
    } 
    else {
        return show.map(c => (
            <div>
                {c.name.common}
                <button onClick={() => showCountry(c.name.common)}>Show</button>
            </div>
        ))
    }
}

export default Countries;