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
    const today = new Date();
    const currentTrip = myTripInfos.find(tripInfo => {
      return (
        today >= new Date(tripInfo.trip.start) &&
        today <= new Date(tripInfo.trip.end)
      );
    });
    const planningTrips = myTripInfos.filter(tripInfo => {
      return today < new Date(tripInfo.trip.start);
    });
    const pastTrips = myTripInfos.filter(tripInfo => {
      return today > new Date(tripInfo.trip.end);
    });
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <Greeting name={this.props.name} />

          <div className={styles.component}>
            <h2>
              <FontAwesomeIcon icon={faShoePrints} /> Your Current Trip:{' '}
            </h2>
            {currentTrip ? (
              <div>
                <Link href='/dashboard'>
                  <a>
                    <TripCard
                      tripName={currentTrip.trip.name}
                      newChatNum={currentTrip.newChatNum}
                      newNoteNum={currentTrip.newNoteNum}
                    />
                  </a>
                </Link>
              </div>
            ) : (
              <h3>Your next adventure is yet to come...</h3>
            )}
          </div>

          <div className={styles.component}>
            <h2>
              <FontAwesomeIcon icon={faPen} /> You are planning for:{' '}
            </h2>
            {planningTrips.length > 0 ? (
              <div>
                {planningTrips.map((planningTrip, index) => (
                  <Link href='/dashboard' key={index}>
                    <a>
                      <TripCard
                        tripName={planningTrip.trip.name}
                        newChatNum={planningTrip.newNoteNum}
                        newNoteNum={planningTrip.newChatNum}
                      />
                    </a>
                  </Link>
                ))}
              </div>
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
              <div>
                {pastTrips.map((pastTrip, index) => (
                  <Link href='/dashboard' key={index}>
                    <a>
                      <TripCard
                        tripName={pastTrip.trip.name}
                        newChatNum={pastTrip.newNoteNum}
                        newNoteNum={pastTrip.newChatNum}
                      />
                    </a>
                  </Link>
                ))}
              </div>
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
}

UserHomePage.propTypes = {
  name: PropTypes.string.isRequired,
};
