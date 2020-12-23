import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const positive = good / all * 100;
  const average = (good + bad * -1) / all;
  if (all === 0) {
    return (
      <>
        <p>No feedback given.</p>
      </>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="bad" value={bad} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  return (
    <>
      <h1> Give Feedback </h1>
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
