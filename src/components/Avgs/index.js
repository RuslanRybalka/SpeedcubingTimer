import React from 'react';
import s from './avgs.module.scss';
import { connect } from 'react-redux';

const Avgs = (props) => {
  return (
    <div className={s['avgs-container']}>
      <div className={s.avg}>Avg 5: <span className={s.avg5}>{props.time5 ? props.time5.toFixed(3) : ''}</span></div>
      <div className={s.avg}>Avg 12: <span className={s.avg12}>{props.time12 ? props.time12.toFixed(3) : ''}</span></div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    time5: state.avg5,
    time12: state.avg12
  }
}
export default connect(
  mapStateToProps,
  null
)(Avgs);