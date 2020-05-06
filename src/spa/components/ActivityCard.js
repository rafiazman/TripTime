/** @format */

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
import { faClock } from '@fortawesome/free-regular-svg-icons';
import PeopleList from './PeopleList';
import TimeDisplay from './TimeDisplay';

import Tooltip from './Tooltip';
import { AuthContext } from '../contexts/AuthContext';

export default class ActivityCard extends React.Component {
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
      return (
        <AuthContext.Consumer>
          {({ currentUser }) => {
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
                  <PeopleList people={activity.people} />
                  <span className={styles.startTime}>
                    <FontAwesomeIcon icon={faClock} /> From:{' '}
                    <TimeDisplay time={activity.start} />
                  </span>
                  <span className={styles.endTime}>
                    <FontAwesomeIcon icon={faClock} /> To:
                    <TimeDisplay time={activity.end} />
                  </span>
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
                          component={
                            <FontAwesomeIcon icon={faChevronCircleUp} />
                          }
                        />
                      ) : (
                        <Tooltip
                          text={'Show Notes'}
                          component={
                            <FontAwesomeIcon icon={faChevronCircleDown} />
                          }
                        />
                      )}
                    </span>
                  </div>
                </div>
                {this.state.notePopped && (
                  <NotesCard notes={activity.notes} me={currentUser} />
                )}
              </div>
            );
          }}
        </AuthContext.Consumer>
      );
    } else {
      return (
        <p>{messageIfNoEvent ? messageIfNoEvent : 'No upcoming events'}</p>
      );
    }
  }
}

ActivityCard.propTypes = {
  activity: PropTypes.object,
  messageIfNoEvent: PropTypes.string,
  onMap: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};
