//TimerWatch - класс работы таймера

export default class TimerWatch {
  constructor(){
    //timeStart - время старта таймера
    this.timeStart = 0;
    //isRun - запущен ли таймер
    this.isRun = false;
    //isReady - готов ли таймер к старту
    this.isReady = true;
    //time - текущее пройденное время
    this.time = 0;
  }
  // start() - функция старта таймера. Устанавливает время запуска таймера и флаг "таймер запущен"
  start = () => {
    this.timeStart = Date.now();
    this.isRun = true;
    //this.run();
  }
  //run() - функция подсчета пройденного времени
  run = () => {
    if(this.isRun){
      requestAnimationFrame(this.run);
      let timeCurrent = Date.now();
      this.time = timeCurrent - this.timeStart;
    }
  }

  stop = () => {
    this.isRun = false;
  }
  //timeFormat() - функция форматирования пройденного времени в читаемый вид
  timeFormat = () => {
    let ms = formatMs(this.time % 1000);
    let seconds = Math.floor(this.time / 1000);
    let sec = seconds % 60;
    let minutes = Math.floor(seconds / 60);
    if (minutes <= 0){
      return `${sec}.${ms}`;
    }else{
      return `${minutes} : ${sec}.${ms}`;
    }
  }
  //getTime() - фунция получения текущего пройденного времени в милисекундах
  getTime = () => {
    return this.time;
  }
  
  //getTimeFormat - получить форматированное пройденное время
  getTimeFormat = () => {
    return this.timeFormat();
  }
  
}

//formatMs() - дополнительная функция для форматирования вывода времени
function formatMs(time){
  let result = '000';
  let timeString = String(time);
  return result.slice(0, -timeString.length).concat(timeString);
}
