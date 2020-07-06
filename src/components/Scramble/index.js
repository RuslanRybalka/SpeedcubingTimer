import React from 'react';
import s from './scramble.module.scss';

//Scramble - компонент отображения скрамбла

export const Scramble = (props) => {
  return (
    <div id={s.scramble}>
       {props.scramble}
    </div>
  )
}
