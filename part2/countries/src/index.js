import React, { useState, useEffect } from 'react';
import ReactDOM, { render } from 'react-dom';
import Display from './components/Display'
import './index.css';
import axios from 'axios';

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
      .catch(err => console.log(err))
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
      <Display displayedCountries={displayed} setDisplayedCountries={setDisplayedCountries} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
