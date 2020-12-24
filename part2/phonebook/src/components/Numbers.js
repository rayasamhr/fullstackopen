import React from 'react'

const Numbers = ({ persons }) => {
    return (
        <>
            <h1>Numbers</h1>
            <ul>
                {persons.map(person =>
                    <li key={person.id}>{person.name} {person.phone}</li>)}
            </ul>
        </>
    )
}

export default Numbers