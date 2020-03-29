/** @format */

import React from 'react';
import styles from '../css/timeline.module.css';
import EventCard from './EventCard';
import PropTypes from 'prop-types';

export default class TripTimeline extends React.Component {
  constructor(props) {
    super(props);
  }

  populateTimeline(activities) {
    return activities.map((activity, index) => (
      <div
        key={index}
        className={index % 2 === 0 ? styles.timelineLeft : styles.timelineRight}
      >
        {index % 2 === 0 ? 'left' : 'right'}
        <EventCard onMap={false} activity={activity} onClose={null} />
      </div>
    ));
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
