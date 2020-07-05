export default class Scrambler{
  constructor(target){    
    this.target = {};
    this.result = [];
    if(typeof target == 'object'){
      this.target = target;
    }else if(typeof target == 'string'){
      this.target = document.querySelector(target);
    }
  }

  scramble = () => {
    this.result = []; 
    let alphabet = ["R", "L", "U", "D", "F", "B"];
    let turns = {
      "R": [`R`, `R'`, 'R2'],
      "L": [`L`, `L'`, 'L2'],
      "U": [`U`, `U'`, 'U2'],
      "D": [`D`, `D'`, 'D2'],
      "F": [`F`, `F'`, 'F2'],
      "B": [`B`, `B'`, 'B2']
    }
    let oposits = {
      "R": "L",
      "L": "R",
      "F": "B",
      "B" : "F",
      "U": "D",
      "D": "U"
    }
    let disable = [];
    let i = 0;  
    let maxTurns = 22 + Math.floor(Math.random()*4);
    while(i < maxTurns){
      let turnIndex = Math.floor(Math.random()*6);
      let currentSide = alphabet[turnIndex];
      if(!disable.includes(currentSide) && !disable.includes(oposits[currentSide])){
          let currentTurn = turns[currentSide][Math.floor(Math.random()*3)];
          this.result.push(currentTurn);
          disable = [];
          disable.push(currentSide);
          i++;
          
      }else{
          continue;
      }
      
    } 

    this.target.innerHTML = [...this.result].join('&nbsp;&nbsp;&nbsp;');   
  }

  getScramble  = () => {
    return  [...this.result].join(' ');    
  }
}