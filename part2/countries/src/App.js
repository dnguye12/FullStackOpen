import { useState, useEffect } from 'react'

import SearchBar from './components/SearchBar';

import Services from './services/Services';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Services.getAll().then(response => {
      setCountries(response);
    })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const doSearch = (event) => {
    event.preventDefault();
    const helper = countries.filter(c => 
      c.name.common.toLowerCase().includes(search)
      || c.name.official.toLowerCase().includes(search)
      || c.altSpellings.some(c => c.toLowerCase().includes(search))
    );
    setShow(helper);
  }

  const showCountry = (name) => {
    const helper = countries.filter(c => c.name.common === name);
    setShow(helper);
  }
  return (
    <div>
    <SearchBar search={search} handleSearchChange={handleSearchChange} doSearch={doSearch}/>
    <Countries show={show} search={search} showCountry={showCountry}/>
    </div>
    )
}

export default App;
