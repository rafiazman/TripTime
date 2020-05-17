/** @format */

import React from 'react';
import TripTitle from './TripTitle';
import TripTimeline from './TripTimeline';
import styles from '../../css/trip-summary.module.css';
import { TripContext } from '../../contexts/TripContext';
import TripError from '../../components/TripError';

export default function TripSummary() {
  return (
    <TripContext.Consumer>
      {({ errorStatus }) => {
        if (errorStatus) return <TripError status={errorStatus} />;
        else
          return (
            <div className={styles.tripSummary}>
              <TripTitle />
              <TripTimeline />
            </div>
          );
      }}
    </TripContext.Consumer>
  );
}
