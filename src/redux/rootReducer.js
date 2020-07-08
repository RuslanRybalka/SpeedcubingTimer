import {ADD, DELETE, AVG, SHOW_INFO, HIDE_INFOS} from './actions.js';

const initState ={
    avg5: null,
    avg12: null,
    solves: []
  };

export const rootReducer = (state = initState, action) => {

  switch(action.type){
    case ADD:
      return {...state,
        solves: [...state.solves,
                  {
                    id: action.payload.id,
                    time: action.payload.time,
                    scramble: action.payload.scramble,
                    showInfo: false
                  }
                ]
      };
    case DELETE:
      return {...state, solves: [...state.solves.filter(item => item.id !== action.payload)]}
    case AVG:
      let avg5 = null;
      if (state.solves.length > 4){
        avg5 = state.solves.slice(-5).sort( (a,b) => a.time - b.time).slice(1,4).reduce((acc, element) => acc + +element.time, 0) / 3;
        //console.log(avg5 = state.solves.slice(-5).sort( (a,b) => a.time - b.time).slice(1,4));
      }  
      let avg12 = null;
      if (state.solves.length >= 12){
        avg12 = state.solves.slice(-12).sort( (a,b) => a.time - b.time).slice(1,11).reduce((acc, element) => acc + +element.time, 0) / 9;
        //console.log(avg5 = state.solves.slice(-5).sort( (a,b) => a.time - b.time).slice(1,4));
      }   
      return {...state, avg5: avg5, avg12: avg12}
    case SHOW_INFO: 
      return {...state, solves: 
        state.solves.map( element => {        
          if(element.id === action.payload){
            return {...element, showInfo: !element.showInfo}
          }else{
            return element
          }
        }
        )
      }
    case HIDE_INFOS:
      return {
        ...state,
        solves: 
          state.solves.map( solve => {return {...solve, showInfo: false}})
      }
    default: 
      return state;
  }
}



//   if(action.type === ADD){
//     return {...state,
//       solves: [...state.solves,
//                 {
//                   id: action.payload.id,
//                   time: action.payload.time,
//                   scramble: action.payload.scramble,
//                   showInfo: false
//                 }
//               ]
//     };
//   }
//   if(action.type === DELETE){
//     return {...state, solves: [...state.solves.filter(item => item.id !== action.payload)]}
//   }
//   if(action.type === AVG) {   
//     let avg5 = null;
//     if (state.solves.length > 4){
//       avg5 = state.solves.slice(-5).sort( (a,b) => a.time - b.time).slice(1,4).reduce((acc, element) => acc + +element.time, 0) / 3;
//       //console.log(avg5 = state.solves.slice(-5).sort( (a,b) => a.time - b.time).slice(1,4));
//     }  
//     let avg12 = null;
//     if (state.solves.length >= 12){
//       avg12 = state.solves.slice(-12).sort( (a,b) => a.time - b.time).slice(1,11).reduce((acc, element) => acc + +element.time, 0) / 9;
//       //console.log(avg5 = state.solves.slice(-5).sort( (a,b) => a.time - b.time).slice(1,4));
//     }   
//     return {...state, avg5: avg5, avg12: avg12}
//   }
//   if(action.type === SHOW_INFO){
//     return {...state, solves: 
//       state.solves.map( element => {        
//         if(element.id === action.payload){
//           return {...element, showInfo: !element.showInfo}
//         }else{
//           return {
//             ...element, showInfo: false
//           }
//         }
//       }
//       )
//     }
//   }
//   return state;
// }

