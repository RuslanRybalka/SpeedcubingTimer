export default class TimerWatch {
  constructor(){
    this.timeStart = 0;
    this.isRun = false;
    this.isReady = true;
    this.time = 0;
  }
  start = () => {
    this.timeStart = Date.now();
    this.isRun = true;
    //this.run();
  }
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
  
  timeFormat = () => {
    let ms = this.formatMs(this.time % 1000);
    let seconds = Math.floor(this.time / 1000);
    let sec = seconds % 60;
    let minutes = Math.floor(seconds / 60);
    if (minutes <= 0){
      return `${sec}.${ms}`;
    }else{
      return `${minutes} : ${sec}.${ms}`;
    }
  }

  getTime = () => {
    return this.time;
  }
  getTimeFormat = () => {
    return this.timeFormat();
  }
  formatMs(time){
    let result = '000';
    let timeString = String(time);
    return result.slice(0, -timeString.length).concat(timeString);
  }
}
