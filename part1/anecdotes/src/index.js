import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//Data

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

//Reusable components

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

//Helper functions

const getRandom = (size) => {
  const gen = Math.floor(Math.random() * size);
  console.log(gen);
  return gen;
}

const funcOnCopy = f => arr => selected => {
  const copy = [...arr];
  copy[selected] += 1;
  console.log(copy);
  f(copy);
}

const findLargestIndex = (arr) => {
  let largestIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[largestIndex]) {
      largestIndex = i;
    }
  }
  return largestIndex;
}

//Main component

const App = ({ anecdotes, getRandom }) => {
  const [selected, setSelected] = useState(0)
  const [votes, updateVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostPopular, setPopular] = useState(0)

  const updateVoteCount = () => {
    const updateState = (arr) => {
      updateVotes(arr);
      setPopular(findLargestIndex(arr));
    }
    return funcOnCopy(updateState)(votes)(selected);
  }

  return (
    <>
      <h1>
        Ancedote of the Day
    </h1>
      <p>
        {anecdotes[selected]}
      </p>
      <Button text="next anecdote" onClick={() => setSelected(getRandom(anecdotes.length))} />
      <Button text="vote" onClick={updateVoteCount} />
      <h1>
        Anecdote with the Most Votes
      </h1>
      <p>
        {anecdotes[mostPopular]}
        <br />
        has {votes[mostPopular]} votes
      </p>
    </>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} getRandom={getRandom} />,
  document.getElementById('root')
)