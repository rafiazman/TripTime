/** @format */

import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';

export default function TimeDisplay(props) {
  const calendarFormat = {
    sameDay: 'dddd[,] DD/MM/YYYY [at] LT',
    nextDay: 'dddd[,] DD/MM/YYYY [at] LT',
    nextWeek: 'dddd[,] DD/MM/YYYY [at] LT',
    lastDay: 'dddd[,] DD/MM/YYYY [at] LT',
    lastWeek: 'dddd[,] DD/MM/YYYY [at] LT',
    sameElse: 'dddd[,] DD/MM/YYYY [at] LT',
  };

  return (
    <span style={{ verticalAlign: 'middle' }}>
      {moment(props.time).calendar(null, calendarFormat)}
    </span>
  );
}

TimeDisplay.propTypes = {
  time: PropTypes.any,
};
