/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import TripTitle from './TripTitle';
import TripTimeline from './TripTimeline';
import styles from '../../css/trip-summary.module.css';
import Link from 'next/link';

export default class TripSummary extends React.Component {
  render() {
    const trip = this.props.trip;
    const user = this.props.user;
    return (
      <div className={styles.tripSummary}>
        <TripTitle
          name={trip.name}
          people={trip.people}
          description={trip.description}
        />
        {user && (
          <TripTimeline activities={trip.activities.concat(trip.travels)} />
        )}
        {!user && (
          <div className={'fit-center'}>
            <br />
            <Link href={'api/login'}>
              <a> Log in </a>
            </Link>{' '}
            to view trip details
          </div>
        )}
      </div>
    );
  }
}

TripSummary.propTypes = {
  trip: PropTypes.object.isRequired,
  user: PropTypes.any,
};
