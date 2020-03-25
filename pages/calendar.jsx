/** @format */
import React from 'react';
import withLayout from '../components/Layout';
import ReactCalendar from 'react-calendar';
import styles from '../css/calendar.module.css';
import CalendarSummary from '../components/CalendarSummary';
import events from '../dummy-data/events';

function Calendar() {
  return (
    <div className={styles.calendarContainer}>
      <ReactCalendar />
      <CalendarSummary events={events} />
    </div>
  );
}

export default withLayout(Calendar);
