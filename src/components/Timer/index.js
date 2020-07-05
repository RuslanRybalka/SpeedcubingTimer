import React from 'react';
import t from './timer.module.scss';

export const Timer = () => {
  return (
    <div className={t.timer_container}>
      <div id={t.timer}>
        0.0
      </div>   
    </div>
  )
}
