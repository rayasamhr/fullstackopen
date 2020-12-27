import React from 'react'
import PersonService from '../services/persons';

const Numbers = ({ persons, setPersons }) => {

    const promptToDelete = person => {
        if (window.confirm(`Do you really want to delete ${person.name}?`)) {
            PersonService.deletePerson(person.id)
                .then(data => {
                    console.log(data)
                    setPersons(persons.filter(obj => obj.id !== person.id))
                })
        }
    } 

    return (
        <>
            <h1>Numbers</h1>
            <ul>
                {persons.map(person =>
                    <li key={person.id}>
                        {person.name} {person.phone}
                        <button onClick={() => promptToDelete(person)}> delete </button>
                    </li>)}
            </ul>
        </>
    )
}

export default Numbers