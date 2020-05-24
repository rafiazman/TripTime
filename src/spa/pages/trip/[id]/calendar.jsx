/** @format */
import React, { useEffect, useState } from 'react';
import styles from '../../../css/calendar.module.css';
// eslint-disable-next-line no-unused-vars
import CalendarSummary from '../../../components/calendar/CalendarSummary';
import Link from 'next/link';
import TripTeamLayout from '../../../components/layout/TripTeamLayout';
import { AuthContext } from '../../../contexts/AuthContext';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function Calendar(props) {
  const tripID = props.tripID;
  // eslint-disable-next-line no-unused-vars
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const hostName = process.env.API_HOSTNAME;
    axios.defaults.withCredentials = true;
    axios.get(`${hostName}/api/trip/${tripID}/activities`).then(
      res => setActivities(res.data),
      () => setActivities([]),
    );
  }, []);
  return (
    <AuthContext.Consumer>
      {({ currentUser, setAnchor }) => (
        <TripTeamLayout
          user={currentUser}
          activeLink={'Calendar'}
          tripID={tripID}
        >
          {currentUser ? (
            <div className={styles.calendarContainer}>
              {/*<CalendarSummary events={activities} />*/}
              <div style={{ marginTop: '4rem' }}>
                <p>Hi {currentUser.name},</p>
                <p>
                  TripTime is working hard to deliver the calendar to you in our
                  second release.
                </p>
                <p>Thank you for staying with us :)</p>
              </div>
            </div>
          ) : (
            <div className={'fit-center'}>
              <Link href={'/login'}>
                <a onClick={() => setAnchor(`/trip/${tripID}/calendar`)}>
                  {' '}
                  Log in{' '}
                </a>
              </Link>
              to see the calendar
            </div>
          )}
        </TripTeamLayout>
      )}
    </AuthContext.Consumer>
  );
}

Calendar.getInitialProps = ({ query }) => {
  return { tripID: query.id };
};

Calendar.propTypes = {
  tripID: PropTypes.string.isRequired,
};
