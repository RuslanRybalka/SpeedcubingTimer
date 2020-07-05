import React, {useEffect} from 'react';
import './App.css';
import {Timer} from './components/Timer';
import {Scramble} from './components/Scramble';

import TimerWatch from './add/TimerWatch.js';
import Scrambler from './add/Scrambler.js';

const App = () => {

  let scrambler = new Scrambler();
  let timer  = new TimerWatch();
  scrambler.scramble();
  useEffect(()=>{     
    console.log('Hello people');
  }, []);

  return (
    <div className="App">
      <Scramble scramble={scrambler.getScramble()}/>
      <Timer timer={timer}/>
    </div>
  );
}

export default App;
