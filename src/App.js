import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import './App.css';
import { Timer } from './components/Timer';
import { Scramble } from './components/Scramble';
import ResultsContainer from './components/ResultsContainer';

import TimerWatch from './add/TimerWatch.js';
import Scrambler from './add/Scrambler.js';

import { addAction } from './redux/actionCreators.js'

const App = (props) => {

  let scrambler = new Scrambler();
  let timer  = new TimerWatch();

  let isSpacebarPressed = false;
  const [time, setTime] = useState(0);
  const [scramble, setScramble] = useState(scrambler.scramble());
  const [classes, setClasses] = useState('');

  const handlerDelayBeforeStart = (event) => {
    if(event.keyCode === 32){
      if(!isSpacebarPressed){
        timer.isReady = false;
        setClasses('text-red');
        let delayTimer = setTimeout(() => {
          timer.isReady = true;
          
          setClasses('text-green');
          window.removeEventListener('keydown', handlerDelayBeforeStart);
          window.addEventListener('keyup', handlerStartTimer);
        }, 500);
        window.addEventListener('keyup', () => {
          if(!timer.isReady){
            clearTimeout(delayTimer);                 
            window.addEventListener('keydown', handlerDelayBeforeStart);
            isSpacebarPressed = false;            
            setClasses('');
          }
        });
      }
      isSpacebarPressed = true;
    }   
    
  }

  const runTimer = () => {
    if(timer.isRun){
      requestAnimationFrame(runTimer);
      let timeCurrent = Date.now();
      timer.time = timeCurrent - timer.timeStart;
      setTime(timer.getTimeFormat());
    }
  }
  //Функция запуска таймера  
  const handlerStartTimer = (event) => {
    if(timer.isReady){
      if(event.keyCode === 32){
        timer.start();
        runTimer();
        window.removeEventListener('keydown', handlerDelayBeforeStart);
        window.removeEventListener('keyup', handlerStartTimer);
        window.addEventListener('keydown', handlerStopTimer);
      }
    }
    
  }

  //Функция остановки таймера

  const handlerStopTimer = (event) => {
    if(event.keyCode === 32){      
      window.addEventListener('keyup', handlerPrepareStartTimer);
      window.removeEventListener('keydown', handlerStopTimer);
      timer.stop();
      setTime(timer.getTimeFormat());
      setScramble(scrambler.scramble());        
      
      window.addEventListener('keydown', handlerDelayBeforeStart);      
      isSpacebarPressed = false;
      setClasses('');
      props.onAddSolve(timer.getTimeFormat());
    }
    
  }

  //Функция подготовки навешивания обработчика событий нажатия клавиши "пробел" для запуска таймера
  const handlerPrepareStartTimer = (event) => {
    if(event.keyCode === 32){    
      window.addEventListener('keyup', handlerStartTimer);
    } 
  }
  const initApp = () => {
    window.addEventListener('keydown', handlerDelayBeforeStart);
  }
  const removeHandlers = () => {
    window.removeEventListener('keydown', handlerDelayBeforeStart);
  }

  useEffect(()=>{      
    initApp();
    return () => {
      removeHandlers();
    }
  },[]);


  return (
    <div className="App">
      <Scramble scramble = {scramble}/>
      <Timer time = {time} classes = {classes}/>
      <ResultsContainer/>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      onAddSolve: (time) => {
        let id = Math.floor(Math.random()*1000000);
        dispatch( addAction( {id: id, time: time} ) )
      }
    }
}
export default connect(
  state => ({solves: state}),
  mapDispatchToProps,
)(App);
