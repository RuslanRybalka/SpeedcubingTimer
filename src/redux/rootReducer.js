import {ADD, DELETE} from './actions.js';

export const rootReducer = (state = [], action) => {
  if(action.type === ADD){
    return [...state, { id: action.payload.id, time: action.payload.time }];
  }
  if(action.type === DELETE){
    return state.filter(item => item.id !== action.payload)
  }
  return state;
}

