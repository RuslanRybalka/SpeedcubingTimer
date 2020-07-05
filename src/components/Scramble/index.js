import React from 'react';
import s from './scramble.module.scss';

export const Scramble = (props) => {
  return (
    <div id={s.scramble}>
       {props.scramble}
    </div>
  )
}
