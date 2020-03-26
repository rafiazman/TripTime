/** @format */
import React from 'react';
import withLayout from '../components/Layout';
import ReactCalendar from 'react-calendar';
import styles from '../css/calendar.module.css';
import CalendarSummary from '../components/CalendarSummary';
import activities from '../dummy-data/activities';

function Calendar() {
  return (
    <div className={styles.calendarContainer}>
      <ReactCalendar />
      <CalendarSummary events={activities} />
    </div>
  );
}

export default withLayout(Calendar);
