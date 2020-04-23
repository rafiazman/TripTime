/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import SiteInfo from '../SiteInfo';
import Link from 'next/link';
import myTripInfos from '../../app/dummy-data/my-trip-infos';
import Greeting from './Greeting';
import styles from '../../css/homepage.module.css';
import TripList from './TripList';
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
          <TripList
            icon={faShoePrints}
            title='Your Current Trip: '
            tripInfoList={currentTrips}
            displayIfNoTrip={<h3>Your next adventure is yet to come...</h3>}
          />
          <TripList
            icon={faPen}
            title='You are Planning for: '
            tripInfoList={planningTrips}
            displayIfNoTrip={
              <h3>
                No plans yet.{' '}
                <Link href='/'>
                  <a>Plan for a trip</a>
                </Link>{' '}
                today!
              </h3>
            }
          />
          <TripList
            icon={faClock}
            title='Your Memories: '
            tripInfoList={pastTrips}
            displayIfNoTrip={
              <h3>
                No past trips yet. What memory will you create at TripTime?
              </h3>
            }
          />
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
}

UserHomePage.propTypes = {
  name: PropTypes.string.isRequired,
};
