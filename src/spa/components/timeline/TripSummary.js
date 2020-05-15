/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import TripTitle from './TripTitle';
import TripTimeline from './TripTimeline';
import styles from '../../css/trip-summary.module.css';
import Link from 'next/link';
import axios from 'axios';
import { withRouter } from 'next/router';

class TripSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { trip: undefined };
  }

  componentDidMount() {
    const tripID = this.props.tripID;
    const hostName = process.env.API_HOSTNAME;
    axios.defaults.withCredentials = true;
    axios.get(`${hostName}/api/trip/${tripID}`).then(
      res => this.setState(() => ({ trip: res.data })),
      err => {
        if (err.response.status === 401)
          this.setState(() => ({ trip: undefined }));
        else this.props.router.push('/');
      },
    );
  }

  render() {
    const trip = this.state.trip;
    const user = this.props.user;
    return (
      <div className={styles.tripSummary}>
        {trip && (
          <TripTitle
            name={trip.name}
            people={trip.participants}
            description={trip.description}
            id={this.props.tripID}
          />
        )}
        {user && <TripTimeline tripID={this.props.tripID} />}
        {!user && (
          <div className={'fit-center'}>
            <br />
            <Link href={'/login'}>
              <a
                onClick={() =>
                  this.props.setAnchor(`/trip/${this.props.tripID}`)
                }
              >
                {' '}
                Log in{' '}
              </a>
            </Link>
            to view trip details
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(TripSummary);

TripSummary.propTypes = {
  tripID: PropTypes.string,
  user: PropTypes.any,
  router: PropTypes.object.isRequired,
  setAnchor: PropTypes.func.isRequired,
};
