/** @format */

import NotesCard from './NotesCard';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/event-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faChevronCircleUp,
  faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import PeopleList from '../PeopleList';
import TimeDisplay from '../TimeDisplay';

import Tooltip from '../Tooltip';
import { AuthContext } from '../../contexts/AuthContext';
import { DateTimePicker } from "@material-ui/pickers";

export default class ActivityCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: {
        show: false,
      },
      end: {
        show: false,
      },
      notePopped: false,
      unreadNote: false,
    };
  }

  toggleNotes() {
    this.setState(state => ({
      notePopped: !state.notePopped,
    }));
  }

  showStartDateTimePicker() {
    this.setState(state => ({
      start: {
        show: !state.start.show
      },
    }));
  }

  showEndDateTimePicker() {
    this.setState(state => ({
      end: {
        show: !state.end.show
      },
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
              <div
                className={styles.eventCard}
                style={onMap ? { border: '0' } : {}}
              >
                <div className={onMap ? styles.cardOnMap : undefined}>
                  <strong>{activity.name}</strong>
                  <PeopleList people={activity.people} />

                  <div className={styles.startTime} onClick={() => this.showStartDateTimePicker()}>
                    <FontAwesomeIcon icon={faClock} style={{'verticalAlign': 'middle'}} />
                    <span style={{'margin': '0 5px', 'verticalAlign': 'middle'}}>From:</span>
                    {
                      this.state.start.show ?
                      <span>Show time</span>
                      :
                      <TimeDisplay time={activity.start} />
                    }
                  </div>

                  <div className={styles.endTime} onClick={() => this.showEndDateTimePicker()}>
                    <FontAwesomeIcon icon={faClock} style={{'verticalAlign': 'middle'}} />
                    <span style={{'margin': '0 27px 0px 5px', 'verticalAlign': 'middle'}}>To:</span>
                    <TimeDisplay time={activity.end} />
                  </div>

                  <div style={{'marginTop': '15px'}}>{activity.description}</div>

                  <div className={onMap ? styles.optionsOnMap : styles.options}>
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
                  <NotesCard
                    notes={activity.notes}
                    me={currentUser}
                    onMap={onMap}
                  />
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
};
