import React, { useState } from 'react';
import s from './result.module.scss';
import { connect } from 'react-redux';
import { deleteAction, avgAction, showInfoAction, hideInfosAction } from '../../redux/actionCreators.js';

//Result - компонент отображения результата

const Result = (props) =>{

  const [isInfo, setIsInfo] = useState(false);

  return (
    <div className={s.result}>
        <div style = {isInfo ? {display: 'block'} : {display: 'none'}}className={s['result--info']}>
          {props.solve.scramble}
        </div>
      
      <div className={s.index}>
       {props.index}
      </div>      
      <div className={s['result--time']}>{props.solve.time}</div>
      <button onMouseOut = {() => setIsInfo(false)} onMouseOver={()=> setIsInfo(true)} className={s['result--info-btn']} /*data-id={props.solve.id}*/>i</button>
      <button onClick={() => props.deleteSolve(props.solve.id)} className={s['result--delete-btn']} /*data-id={props.solve.id}*/> &times; </button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSolve: id => {
      dispatch( deleteAction(id) )
      dispatch(avgAction());
    },
    // showInfo: id => {
    //   dispatch(hideInfosAction());
    //   dispatch(showInfoAction(id))
    // }
  }
}
export default connect(
  null,
  mapDispatchToProps
)(Result)
