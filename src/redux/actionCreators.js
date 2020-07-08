import {ADD, DELETE, AVG, SHOW_INFO, HIDE_INFOS} from "./actions.js";

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

export const showInfoAction = (id) => {
  return {
    type: SHOW_INFO,
    payload: id
  }
}

export const hideInfosAction = () => {
  return {
    type: HIDE_INFOS
  }
}