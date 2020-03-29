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
  faTimes, faLongArrowAltRight
} from '@fortawesome/free-solid-svg-icons';
import {
  faClock
} from '@fortawesome/free-regular-svg-icons';

import Tooltip from './Tooltip';

const calendarFormat = {
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  nextWeek: 'dddd [at] LT',
  lastDay: '[Yesterday at] LT',
  lastWeek: '[Last] dddd [at] LT',
  sameElse: 'DD/MM/YYYY [at] LT'};

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
      let startTime = moment(activity.start).calendar(null, calendarFormat);
      let endTime = moment(activity.end).calendar(null, calendarFormat);

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
            <span className={styles.startTime}><FontAwesomeIcon icon={faClock}/> From: {startTime}</span>
            <span className={styles.endTime}><FontAwesomeIcon icon={faClock}/> To: {endTime}</span>
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
