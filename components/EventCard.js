/** @format */

import moment from 'moment';
import NotesCard from './NotesCard';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/event-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faChevronCircleUp,
  faChevronCircleDown,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import Tooltip from './Tooltip';

export default class EventCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notePopped: false,
      unreadNote: false,
    };
  }

  toggleNotes() {
    this.setState(state => ({
      notePopped: !state.notePopped,
    }));
  }

  render() {
    const activity = this.props.activity;
    const messageIfNoEvent = this.props.messageIfNoEvent;
    const onMap = this.props.onMap;
    if (activity) {
      let timeText = moment(activity.start).calendar();
      const now = moment();
      if (now.isAfter(activity.start) && now.isBefore(activity.end)) {
        timeText = 'happening now';
      }

      return (
        <div className={styles.eventCard}>
          {this.props.onClose && (
            <span
              className={styles.closeButton}
              onClick={() => this.props.onClose()}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          )}
          <div>
            <strong>{activity.name}</strong>{' '}
            <span className='text-secondary text-it'>({timeText})</span>
            <br />
            <span>{activity.description}</span>
            <div className={styles.options}>
              {!onMap && (
                <span>
                  <Tooltip
                    text={'Show on Map'}
                    component={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                  />
                </span>
              )}
              <span onClick={() => this.toggleNotes()}>
                {this.state.notePopped ? (
                  <Tooltip
                    text={'Hide Notes'}
                    component={<FontAwesomeIcon icon={faChevronCircleUp} />}
                  />
                ) : (
                  <Tooltip
                    text={'Show Notes'}
                    component={<FontAwesomeIcon icon={faChevronCircleDown} />}
                  />
                )}
              </span>
            </div>
          </div>
          {this.state.notePopped && <NotesCard notes={activity.notes} />}
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
  activity: PropTypes.object,
  messageIfNoEvent: PropTypes.string,
  onMap: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};
