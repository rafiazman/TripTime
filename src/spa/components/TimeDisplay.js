/** @format */

import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';

export default function TimeDisplay(props) {
  const calendarFormat = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'DD/MM/YYYY [at] LT',
  };
  return <span>{moment(props.time).calendar(null, calendarFormat)}</span>;
}

TimeDisplay.propTypes = {
  time: PropTypes.any,
};
