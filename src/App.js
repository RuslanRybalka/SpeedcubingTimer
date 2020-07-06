import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import './App.css';
import { Timer } from './components/Timer';
import { Scramble } from './components/Scramble';
import ResultsContainer from './components/ResultsContainer';
import Avgs from './components/Avgs';

import TimerWatch from './add/TimerWatch.js';
import Scrambler from './add/Scrambler.js';

import { addAction, avgAction } from './redux/actionCreators.js'

const App = (props) => {
  //scrambler - переменная, которая отвечает за скарамбл
  let scrambler = new Scrambler();

  //timer - экземпляр класса TimerWatch, который отвечает за работу таймера
  let timer  = new TimerWatch();

  // isSpacebarPressed - переменная, отвечающая за состояние ЗАжатия клавиши "Пробел"
  let isSpacebarPressed = false;

  //time - переменная состояния, которая содержит текущее потраченное время сборки кубика
  const [time, setTime] = useState(0);

  // scramble - переменная состояния, которая хранит значени текущего скрамбла
  const [scramble, setScramble] = useState(scrambler.scramble());

  //classes - переменная, которая содержит класс, который нужно применить к циферблату
  //таймера в зависимости от цикла его работы
  const [classes, setClasses] = useState('');


  //handlerDelayBeforeStart - функция, которая срабатывает при нажатии на "Пробел" 
  //для запуска таймера
  const handlerDelayBeforeStart = (event) => {
    //проверяем был ли нажат "Пробел"
    if(event.keyCode === 32){
      //Проверяем был ли ЗАжат "Пробел"
      if(!isSpacebarPressed){
        //устанавливаем флаг, что таймер еще не готов к запуску
        timer.isReady = false;
        //устанавливаем таймеру класс 'text-red'
        setClasses('text-red');
        //делаем задержку старта таймера для предотвращения случайного нажатия на "Пробел"
        let delayTimer = setTimeout(() => {
          timer.isReady = true;     
          //когда таймер готов к запуску делаем его зеленым цветом     
          setClasses('text-green');
          //удаляем обработчик события ЗАжатия клавиши "Пробел"
          window.removeEventListener('keydown', handlerDelayBeforeStart);
          //добавляем обработчкик события ОТжатия клавиши "Пробел" для старта таймера
          window.addEventListener('keyup', handlerStartTimer);
        }, 500);
        //добавляем обработчик события ОТжатия "Пробела" если он был отжат раньше чем положено
        window.addEventListener('keyup', () => {
          //если задержка не завершена, то очищается timeout и таймер не запустится
          //так как не будет добавлен обработчик отжатия "Пробела" для старта таймера
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

  //runTimer  - функция, которая вычисляет время таймера после его запуска

  const runTimer = () => {
    if(timer.isRun){
      requestAnimationFrame(runTimer);
      let timeCurrent = Date.now();
      timer.time = timeCurrent - timer.timeStart;
      //рендерим отображения времени
      setTime(timer.getTimeFormat());
    }
  }
  //handlerStartTimer - функция - обработчик события ОТжатия "Пробела" для старта таймера
  const handlerStartTimer = (event) => {
    //если таймер готов к запуску
    if(timer.isReady){
      //если была нажата клавиша "Пробел"
      if(event.keyCode === 32){
        //запускаем таймер
        timer.start();
        runTimer();
        //убираем обработчики для подготовки и старта таймер
        window.removeEventListener('keydown', handlerDelayBeforeStart);
        window.removeEventListener('keyup', handlerStartTimer);
        //добавляем обработчик остановки таймера
        window.addEventListener('keydown', handlerStopTimer);
      }
    }
    
  }

  //handlerStopTimer - функция-обработчик остановк таймера
    const handlerStopTimer = (event) => {
    //проверяем, был ли нажат "Пробел"
    if(event.keyCode === 32){   
      //добавляем обработчик подкготовки таймера к старту   
      window.addEventListener('keyup', handlerPrepareStartTimer);
      //удаляем обработчик остановки таймера
      window.removeEventListener('keydown', handlerStopTimer);
      timer.stop();
      //рендерим отображения таймера и следующего скрамбла
      setTime(timer.getTimeFormat());
      setScramble(scrambler.scramble());        
      //добвляем обработчик задержки старта таймера
      window.addEventListener('keydown', handlerDelayBeforeStart);  
      //устанавливаем флаг готовности таймера для следующего старта    
      isSpacebarPressed = false;
      setClasses('');
      //добаляем результат текущей сборки в state
      props.onAddSolve(timer.getTimeFormat());
    }
    
  }

  //Функция подготовки навешивания обработчика событий нажатия клавиши "пробел" для запуска таймера
  const handlerPrepareStartTimer = (event) => {
    if(event.keyCode === 32){    
      window.addEventListener('keyup', handlerStartTimer);
    } 
  }

  //функциия начальной инициализации приложения (добавление стартового обработчика события)
  const initApp = () => {
    window.addEventListener('keydown', handlerDelayBeforeStart);
  }
  //функия удаления обработчика события после размонтирования компонента
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
      <Avgs/>
    </div>
  );
}

//Привязка redux хранилища к компоненту

const mapStateToProps = (state) => {
  return {
    solves: state
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onAddSolve: (time) => {
        let id = Math.floor(Math.random()*1000000);
        dispatch( addAction( {id: id, time: time} ) );
        dispatch(avgAction());
      }
    }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
