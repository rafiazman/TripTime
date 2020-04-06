/** @format */

import React from 'react';
import styles from '../../css/calendar.module.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import EventCard from '../shared-elements/EventCard';

export default class CalendarSummary extends React.Component {
  render() {
    const events = this.props.events;
    const now = moment();
    const currentEvent = events.find(
      event => now.isAfter(event.start) && now.isBefore(event.end),
    );
    const futureEvents = events
      .filter(event => now.isBefore(event.start))
      .sort();
    const nextEvent = futureEvents && futureEvents[0];
    const numEventsToday = futureEvents.filter(event =>
      now.isSame(event.start, 'day'),
    ).length;
    const numEventsThisWeek = futureEvents.filter(event =>
      now.isSame(event.start, 'week'),
    ).length;
    const numEventsThisMonth = futureEvents.filter(event =>
      now.isSame(event.start, 'month'),
    ).length;

    return (
      <div className={styles.calendarSummary}>
        <h1>Your Scheduled Adventures</h1>

        <h3>Current:</h3>
        <EventCard
          activity={currentEvent}
          messageIfNoEvent='Nothing on right now'
          onMap={false}
        />

        <h3>Next:</h3>
        <EventCard activity={nextEvent} onMap={false} />

        {numEventsThisMonth > 0 && (
          <div>
            <h3>Coming up later...</h3>
            <p>
              <strong>Later today:</strong> {numEventsToday}
              <br />
              <strong>Later this week:</strong> {numEventsThisWeek}
              <br />
              <strong>Later this month:</strong> {numEventsThisMonth}
            </p>
          </div>
        )}
      </div>
    );
  }
}

CalendarSummary.propTypes = {
  events: PropTypes.array.isRequired,
};
