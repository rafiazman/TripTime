/** @format */

import React from 'react';
import styles from '../css/timeline.module.css';
import EventCard from './EventCard';
import PropTypes from 'prop-types';
import TravelCard from './TravelCard';

export default class TripTimeline extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const activities = this.props.activities.sort((a, b) =>
      a.start.localeCompare(b.start),
    );
    return (
      <div className={styles.tripTimelineContainer}>
        <div className={styles.tripTimeline}>
          {this.populateTimeline(activities)}
        </div>
      </div>
    );
  }
}

TripTimeline.propTypes = {
  activities: PropTypes.array.isRequired,
};
