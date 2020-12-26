import React, { useState, useEffect } from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import axios from 'axios';

const Feature = ({country}) => {
  console.log(country);
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(lang => <li> {lang.name} </li>)}
      </ul>
      <img src={country.flag} width="300" height="200" alt="new" />
    </>
  )
}

const Display = ({ displayedCountries }) => {
  if (displayedCountries.length > 10) {
    return (
      <div>
        Too many matches, please try another filter.
      </div>
    )
  } else if (displayedCountries.length === 1) {
    return (
      <Feature country={displayedCountries[0]} />
    )
  } else {
    return (
      <div>
        {displayedCountries.map(country => <p>{country.name}</p>)}
      </div>
    )
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [displayed, setDisplayedCountries] = useState([])

  useEffect(() => {
    console.log('effect used');
    axios.get("https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag")
      .then(response => {
        const res = response.data;
        setCountries(res);
        setDisplayedCountries(res);
      })
  }, [])

  const filterInput = (event) => {
    const input = event.target.value;
    const matches = countries.filter(country => country.name.toLowerCase()
    .includes(input.toLowerCase()));
    setDisplayedCountries(matches);
  }

  return (
    <>
      <div>
        find countries <input onChange={filterInput} />
      </div>
      <Display displayedCountries={displayed} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
