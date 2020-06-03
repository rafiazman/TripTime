/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import SiteInfo from '../SiteInfo';
import Link from 'next/link';
import Greeting from '../Greeting';
import styles from '../../css/homepage.module.css';
import TripList from './TripList';
import axios from 'axios';

import {
  faShoePrints,
  faPen,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastTrips: [],
      currentTrips: [],
      planningTrips: [],
      planningLoading: true,
      currentLoading: true,
      pastLoading: true,
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
      .then(trips =>
        this.setState(() => ({ currentTrips: trips, currentLoading: false })),
      );
    axios
      .get(`${hostName}/api/trips/past`)
      .then(
        response => response.data,
        () => [],
      )
      .then(trips =>
        this.setState(() => ({ pastTrips: trips, pastLoading: false })),
      );
    axios
      .get(`${hostName}/api/trips/future`)
      .then(
        response => response.data,
        () => [],
      )
      .then(trips =>
        this.setState(() => ({ planningTrips: trips, planningLoading: false })),
      );
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
            title='Your Current Trips:'
            tripInfoList={currentTrips}
            displayIfNoTrip={<h3>Your next adventure is yet to come...</h3>}
            loading={this.state.currentLoading}
          />

          <TripList
            icon={faPen}
            title='Your Planned Trips:'
            tripInfoList={planningTrips}
            displayIfNoTrip={
              <h3>
                <span style={{ marginRight: '5px' }}>No plans yet.</span>
                <Link href='/newtrip'>
                  <a>Plan for a trip</a>
                </Link>
                <span style={{ marginLeft: '5px' }}>today!</span>
              </h3>
            }
            loading={this.state.planningLoading}
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
            loading={this.state.pastLoading}
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
