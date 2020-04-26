/** @format */
import React from 'react';
import ReactCalendar from 'react-calendar';
import styles from '../css/calendar.module.css';
import CalendarSummary from '../components/calendar/CalendarSummary';
import activities from '../app/dummy-data/activities';
import Link from 'next/link';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import { AuthContext } from '../contexts/AuthContext';

export default class Calendar extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ currentUser }) => (
          <TripTeamLayout user={currentUser}>
            {currentUser ? (
              <div className={styles.calendarContainer}>
                <ReactCalendar />
                <CalendarSummary events={activities} />
              </div>
            ) : (
              <div className={'fit-center'}>
                <Link href={'api/login'}>
                  <a> Log in </a>
                </Link>
                to see the calendar
              </div>
            )}
          </TripTeamLayout>
        )}
      </AuthContext.Consumer>
    );
  }
}
