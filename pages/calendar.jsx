/** @format */
import React from 'react';
import withLayout from '../components/Layout';
import ReactCalendar from 'react-calendar';
import styles from '../css/calendar.module.css';


function Calendar() {
  return (
    <div className={styles.calendarContainer}>
      <ReactCalendar />

    </div>
  );
}

export default withLayout(Calendar);
