import {ADD, DELETE, AVG} from "./actions.js";

export const addAction = (payload) => {
  return {
    type: ADD,
    payload: payload
  }
}

export const deleteAction = (id) => {
  return {
    type: DELETE, 
    payload: id
  }
}

export const avgAction = () => {
  return {
    type: AVG
  }
}