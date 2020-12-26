import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Numbers from './components/Numbers';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsShown, setPersonsShown] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
        setPersonsShown(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('before', persons)
    if (newName === '' || newPhone === '') {
      alert('A required field is empty.')
    } else if (persons.some(person => person.name === newName)) {
      alert(`There already exists a person named ${newName}!`);
    } else if (persons.some(person => person.phone === newPhone)) {
      alert(`There already exists a person with this phone number: ${newPhone}!`);
    } else {
      setPersons(persons.concat({
        name: newName,
        phone: newPhone,
        id: persons.length + 1,
      }));
    }
    setNewName('');
    setNewPhone('');
  }

  const handleChange = (func) => (event) => {
    func(event.target.value);
  }

  const filterInputs = (event) => {
    setPersonsShown(persons.filter(person => person.name.toLowerCase()
      .includes(event.target.value.toLowerCase())));
  }

  return (
    <>
      <div>
        Filter
        <input onChange={filterInputs} />
      </div>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={handleChange(setNewName)} />
        </div>
        <div>
          Phone: <input value={newPhone} onChange={handleChange(setNewPhone)} />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <Numbers persons={personsShown} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

