import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Hello = (props) => {
  return(
    <div>
      <p>Hello {props.name}, you are {props.age} years old!</p>
    </div>
  )
}

const App = () => {

  const name = "Mary";
  const age = 12;

  return (
    <div>
      <h1>Greetings!</h1>
      <Hello name="George"/>
      <Hello name="Daisy" age={12+3}/>
      <Hello name={name} age={age}/>
      <Hello />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));