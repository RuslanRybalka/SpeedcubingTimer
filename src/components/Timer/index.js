import React from 'react';
import t from './timer.module.scss';

export const Timer = (props) => {
  return (
    <div className={t.timer_container +  ' ' + props.classes} >
      <div id={t.timer}>
        {props.time }
      </div>   
    </div>
  )
}
