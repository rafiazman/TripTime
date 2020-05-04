/** @format */

import React from 'react';
import styles from '../../css/timeline.module.css';
import EventCard from '../EventCard';
import PropTypes from 'prop-types';
import TravelCard from './TravelCard';
import axios from 'axios';

export default class TripTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      travels: [],
      loading: true,
    };
  }

  populateTimeline(activities) {
    let left = true;
    return activities.map((activity, index) => {
      if (activity.type === 'travel')
        return (
          <div key={index} className={styles.travelCardContainer}>
            <TravelCard travel={activity} />
          </div>
        );
      else {
        left = !left;
        return (
          <div
            key={index}
            className={left ? styles.timelineLeft : styles.timelineRight}
          >
            <EventCard onMap={false} activity={activity} onClose={null} />
          </div>
        );
      }
    });
  }

  componentDidMount() {
    this.loadActivitiesTravels().then(() => {
      this.setState(() => ({ loading: false }));
    });

    activities.sort((a, b) => a.start.localeCompare(b.start));
  }

  async loadActivitiesTravels() {
    const hostName = process.env.API_HOSTNAME;
    const tripID = this.props.tripID;
    axios.get(`${hostName}/api/trip/${tripID}/activities`).then(
      res => this.setState(() => ({ activities: res.data })),
      () => this.setState(() => ({ activities: [] })),
    );
    axios.get(`${hostName}/api/trip/${tripID}/travels`).then(
      res => this.setState(() => ({ travels: res.data })),
      () => this.setState(() => ({ travels: [] })),
    );
  }

  render() {
    return (
      <div className={styles.tripTimelineContainer}>
        <div className={styles.tripTimeline}>
          {this.populateTimeline(this.state.activities)}
        </div>
      </div>
    );
  }
}

TripTimeline.propTypes = {
  tripID: PropTypes.number.isRequired,
};
