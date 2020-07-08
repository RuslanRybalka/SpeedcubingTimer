import React from 'react';
import s from './results-container.module.scss';
import  Result  from '../Result';
import { connect } from 'react-redux';

//ResultsContainer - компонент-контейнер отображения результатов

const ResultsContainer  = (props) => {
  return (
    <div className={s.results}>
      {[...props.solves].reverse().map((solve, index, arr) => {
        //return <Result index = {arr.length - index}  solve ={solve} key={solve.id} />})
        return <Result index = {arr.length - index}  solve ={solve} key={solve.id} />})
      }       
    </div>
  )  
}

export default connect(
  store => ({solves: store.solves}),
  null
)(ResultsContainer);
