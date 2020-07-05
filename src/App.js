import React from 'react';
import './App.css';
import {Timer} from './components/Timer';
import {Scramble} from './components/Scramble';

function App() {
  return (
    <div className="App">
      <Scramble/>
      <Timer/>
    </div>
  );
}

export default App;
