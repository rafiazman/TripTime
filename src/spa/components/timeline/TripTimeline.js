/** @format */

import React from 'react';
import styles from '../../css/timeline.module.css';
import ActivityCard from '../ActivityCard';
import PropTypes from 'prop-types';
import TravelCard from './TravelCard';
import axios from 'axios';
import ReactLoading from 'react-loading';

export default class TripTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      travels: [],
      activityLoading: true,
      travelLoading: true,
    };
  }

  populateTimeline(activities, travels) {
    const events = [...activities, ...travels].sort((a, b) =>
      a.start.localeCompare(b.start),
    );
    let left = true;
    return events.map((event, index) => {
      if (event.type === 'travel')
        return (
          <div key={index} className={styles.travelCardContainer}>
            <div className={styles.travelCard}>
              <TravelCard travel={event} />
            </div>
          </div>
        );
      else {
        left = !left;
        return (
          <div
            key={index}
            className={left ? styles.timelineLeft : styles.timelineRight}
          >
            <ActivityCard onMap={false} activity={event} onClose={null} />
          </div>
        );
      }
    });
  }

  componentDidMount() {
    const hostName = process.env.API_HOSTNAME;
    const tripID = this.props.tripID;
    axios
      .get(`${hostName}/api/trip/${tripID}/activities`)
      .then(
        res => this.setState(() => ({ activities: res.data })),
        () => this.setState(() => ({ activities: [] })),
      )
      .then(() => this.setState(() => ({ activityLoading: false })));

    axios
      .get(`${hostName}/api/trip/${tripID}/travels`)
      .then(
        res => this.setState(() => ({ travels: res.data })),
        () => this.setState(() => ({ travels: [] })),
      )
      .then(() => this.setState(() => ({ travelLoading: false })));
  }

  render() {
    return (
      <div className={styles.tripTimelineContainer}>
        <div className={styles.tripTimeline}>
          {this.state.activityLoading || this.state.travelLoading ? (
            <div className={styles.timelineLoading}>
              <ReactLoading type='spinningBubbles' color='#ff4200' />
              <p>Loading the timeline...</p>
            </div>
          ) : (
            this.populateTimeline(
              this.state.activities,
              this.state.travels.map(travel => {
                travel.type = 'travel';
                return travel;
              }),
            )
          )}
          <div className={styles.line} />
        </div>
      </div>
    );
  }
}

TripTimeline.propTypes = {
  tripID: PropTypes.string,
};
