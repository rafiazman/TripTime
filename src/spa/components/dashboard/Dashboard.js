/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import SiteInfo from '../SiteInfo';
import Link from 'next/link';
import Greeting from '../Greeting';
import styles from '../../css/homepage.module.css';
import TripList from './TripList';
import {
  faShoePrints,
  faPen,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastTrips: [],
      currentTrips: [],
      planningTrips: [],
    };
  }

  componentDidMount() {
    const hostName = process.env.API_HOSTNAME;
    axios
      .get(`${hostName}/api/trips/current`)
      .then(
        response => response.data,
        () => [],
      )
      .then(trips => this.setState(() => ({ currentTrips: trips })));
    axios
      .get(`${hostName}/api/trips/past`)
      .then(
        response => response.data,
        () => [],
      )
      .then(trips => this.setState(() => ({ pastTrips: trips })));
    axios
      .get(`${hostName}/api/trips/future`)
      .then(
        response => response.data,
        () => [],
      )
      .then(trips => this.setState(() => ({ planningTrips: trips })));
  }

  render() {
    const currentTrips = this.state.currentTrips;
    const pastTrips = this.state.pastTrips;
    const planningTrips = this.state.planningTrips;
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
}

Dashboard.propTypes = {
  name: PropTypes.string.isRequired,
};
