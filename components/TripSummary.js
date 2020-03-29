/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import TripTitle from './TripTitle';
import TripTimeline from './TripTimeline';
import styles from '../css/trip-summary.module.css';

function TripSummary({ trip }) {
  return (
    <div className={styles.tripSummary}>
      <TripTitle
        name={trip.name}
        people={trip.people}
        description={trip.description}
      />
      <TripTimeline activities={trip.activities.concat(trip.travels)} />
    </div>
  );
}

TripSummary.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default TripSummary;
