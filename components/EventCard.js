/** @format */

import moment from 'moment';
import NotesCard from './NotesCard';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/event-card.module.css';

export default class EventCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notePopped: false,
      unreadNote: false,
    };
  }

  render() {
    const event = this.props.event;
    const messageIfNoEvent = this.props.messageIfNoEvent;
    const onMap = this.props.onMap;
    if (event) {
      let timeText = moment(event.start).calendar();
      const now = moment();
      if (now.isAfter(event.start) && now.isBefore(event.end)) {
        timeText = 'happening now';
      }

      return (
        <div className={styles.eventCard}>
          <p>
            <strong>{event.name}</strong>{' '}
            <span className='text-secondary text-it'>({timeText})</span>
            <br />
            {event.description}
          </p>
          <div className={styles.options}></div>
          <NotesCard notes={event.notes} />
        </div>
      );
    } else {
      return (
        <p>{messageIfNoEvent ? messageIfNoEvent : 'No upcoming events'}</p>
      );
    }
  }
}

EventCard.propTypes = {
  event: PropTypes.object,
  messageIfNoEvent: PropTypes.string,
  onMap: PropTypes.bool.isRequired,
};
