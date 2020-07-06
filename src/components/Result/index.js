import React from 'react';
import s from './result.module.scss';
import { connect } from 'react-redux';
import { deleteAction, avgAction } from '../../redux/actionCreators.js';

//Result - компонент отображения результата

const Result = (props) =>{
  return (
    <div className={s.result}>
      <div className={s.index}>
       {props.index}
      </div>
  <div className={s['result--time']}>{props.solve}</div>
      <button className={s['result--info']} data-id={props.solveId}>i</button>
      <button onClick={() => props.deleteSolve(props.solveId)}className={s['result--delete']} data-id={props.solveId}> &times; </button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSolve: id => {
      dispatch( deleteAction(id) )
      dispatch(avgAction());
    }
  }
}
export default connect(
  null,
  mapDispatchToProps
)(Result)
