import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(
                part => <Part key={part.id} part={part} />)}
        </>
    )
}

const Part = ({ part }) => {
    return (
        <>
            <p>
                {part.name} {part.exercises}
            </p>
        </>
    )
}

const Total = ({ parts }) => {
    return (
        <>
            <div>
                <b> Number of exercises: {parts.reduce(
                    (acc, part) => acc + part.exercises,
                    0)}
                </b>
            </div>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course