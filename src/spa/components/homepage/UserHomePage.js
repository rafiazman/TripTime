/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import SiteInfo from '../SiteInfo';
import myTripInfos from '../../app/dummy-data/my-trips';
import Greeting from './Greeting';
import styles from '../../css/homepage.module.css';
import TripCard from './TripCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoePrints,
  faPen,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

export default class UserHomePage extends React.Component {
  render() {
    const currentTrips = this.getCurrentTrips();
    const pastTrips = this.getPastTrips();
    const planningTrips = this.getPlanningTrips();
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <Greeting name={this.props.name} />

          <div className={styles.component}>
            <h2>
              <FontAwesomeIcon icon={faShoePrints} /> Your Current Trip:{' '}
            </h2>
            {currentTrips.length > 0 ? (
              this.generateTripList(currentTrips)
            ) : (
              <h3>Your next adventure is yet to come...</h3>
            )}
          </div>

          <div className={styles.component}>
            <h2>
              <FontAwesomeIcon icon={faPen} /> You are planning for:{' '}
            </h2>
            {planningTrips.length > 0 ? (
              this.generateTripList(planningTrips)
            ) : (
              <h3>
                No plans yet. <a>Plan for a trip</a> today!
              </h3>
            )}
          </div>

          <div className={styles.component}>
            <h2>
              <FontAwesomeIcon icon={faClock} /> Your Memories:{' '}
            </h2>
            {pastTrips.length > 0 ? (
              this.generateTripList(pastTrips)
            ) : (
              <h3>
                No past trips yet. What memory will you create at TripTime?
              </h3>
            )}
          </div>
        </div>
        <SiteInfo />
      </div>
    );
  }
  getPlanningTrips() {
    return myTripInfos;
  }
  getPastTrips() {
    return myTripInfos;
  }
  getCurrentTrips() {
    return myTripInfos;
  }
  generateTripList(tripInfos) {
    return (
      <div>
        {tripInfos.map((tripInfo, index) => (
          <Link href='/dashboard' key={index}>
            <a>
              <TripCard
                tripName={tripInfo.trip.name}
                newChatNum={tripInfo.newNoteNum}
                newNoteNum={tripInfo.newChatNum}
              />
            </a>
          </Link>
        ))}
      </div>
    );
  }
}

UserHomePage.propTypes = {
  name: PropTypes.string.isRequired,
};
