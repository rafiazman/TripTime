/** @format */
import React from 'react';
import ReactCalendar from 'react-calendar';
import styles from '../css/calendar.module.css';
import CalendarSummary from '../components/calendar/CalendarSummary';
import activities from '../dummy-data/activities';
import Link from 'next/link';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import PropTypes from 'prop-types';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    this.props.setUser(this);
  }

  render() {
    return (
      <TripTeamLayout user={this.state.user}>
        {this.state.user ? (
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
    );
  }
}

Calendar.propTypes = {
  setUser: PropTypes.func,
};
