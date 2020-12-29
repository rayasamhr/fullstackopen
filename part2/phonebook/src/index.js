import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Numbers from './components/Numbers';
import PersonService from './services/persons';
import './index.css';

const Notification = ({message, notifType}) => {
  if (message === null) {
    return null;
  }
  return(
    <div className={notifType}>
      {message}
    </div>
  )
}

const App = () => {
  //State hooks
  const [persons, setPersons] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [notif, setNotif] = useState({
    message: null,
    notifType: "success"
  })

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filterValue.toLowerCase()));

  useEffect(() => {
    PersonService.getAll()
      .then(data => {
        setPersons(data);
      })
  }, [persons])

  const handleSubmit = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      phone: newPhone
    }

    if (newName === '' || newPhone === '') {
      alert('A required field is empty.')
    } else if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the book, replace the old number with a new one?`)) {
        const p = persons.find(person => person.name === newName);
        PersonService.updatePerson(p.id, personObject)
          .then(data => {
            setPersons(persons.map(person => person.id !== p.id ? person : data))
            setNewName('');
            setNewPhone('')
            setNotif({message: `${newName} has been updated successfully`, notifType: "success"})
            setTimeout(() => {
              setNotif({message: null, notifType:"success"})
            }, 5000)
          }).catch(err => {
            console.log(err);
            setNotif({message: `${newName} has already been removed from the server`, notifType: "error"})
            setTimeout(() => {
              setNotif({message: null, notifType:"success"})
            }, 5000)
          })
      }
    } else {
      PersonService.createPerson(personObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('');
          setNewPhone('');
          setNotif({message: `${newName} has been added successfully`, notifType: "success"})
          setTimeout(() => {
            setNotif({message: null, notifType:"success"})
          }, 5000)
        }).catch(err => console.log(err))
    }
  }

  const handleChange = (func) => (event) => {
    func(event.target.value);
  }

  const filter = val => {
    setFilterValue(val);
  }

  return (
    <>
      <Notification message={notif.message} notifType={notif.notifType} />
      <div>
        Filter
        <input value={filterValue} onChange={handleChange(filter)} />
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
      <Numbers persons={filteredPersons} setPersons={setPersons} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
