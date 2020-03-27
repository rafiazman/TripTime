/** @format */

import moment from 'moment';
import NotesCard from './NotesCard';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/event-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faStickyNote,
} from '@fortawesome/free-solid-svg-icons';

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
          <div>
            <strong>{event.name}</strong>{' '}
            <span className='text-secondary text-it'>({timeText})</span>
            <br />
            {event.description}
            <br />
            <span className={styles.options}>
              {!onMap && (
                <span>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  Show on Map{' '}
                </span>
              )}
              <span>
                <FontAwesomeIcon icon={faStickyNote} />
                Show notes
              </span>
            </span>
          </div>

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
