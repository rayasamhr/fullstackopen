import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Numbers from './components/Numbers';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [personsShown, setPersonsShown] = useState([...persons])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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
        <input onChange={filterInputs}/>
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

