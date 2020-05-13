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
import { DateTimePicker } from '@material-ui/pickers';
import axios from 'axios';

export default class ActivityCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: {
        show: false,
        dateTime: props.activity.start,
      },
      end: {
        show: false,
        dateTime: props.activity.end,
      },
      notePopped: false,
      unreadNote: false,
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
  }

  toggleNotes() {
    this.setState(state => ({
      notePopped: !state.notePopped,
    }));
  }

  handleStartDateChange = newDate => {
    const tripId = this.props.tripId;

    axios
      .patch(`${process.env.API_HOSTNAME}/api/trip/${tripId}/activities`, {
        id: this.props.activity.id,
        start: newDate.format(),
      })
      .then(res => {
        this.setState(state => ({
          start: {
            ...state.start,
            dateTime: res.data.activity.start,
          },
        }));
      })
      .catch(err => {
        alert(
          'Error: Failed to update start date. \nCheck console for details.',
        );
        console.log(err);
      });
  };

  handleEndDateChange = newDate => {
    const tripId = this.props.tripId;

    axios
      .patch(`${process.env.API_HOSTNAME}/api/trip/${tripId}/activities`, {
        id: this.props.activity.id,
        end: newDate.format(),
      })
      .then(res => {
        this.setState(state => ({
          end: {
            ...state.end,
            dateTime: res.data.activity.end,
          },
        }));
      })
      .catch(err => {
        alert(
          'Error: Failed to update start date. \nCheck console for details.',
        );
        console.log(err);
      });
  };

  toggleStartDateTimePicker() {
    this.setState(state => ({
      start: {
        ...state.start,
        show: !state.start.show,
      },
    }));
  }

  toggleEndDateTimePicker() {
    this.setState(state => ({
      end: {
        ...state.end,
        show: !state.end.show,
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

                  <div className={styles.startTime}>
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ verticalAlign: 'middle' }}
                      onClick={() => this.toggleStartDateTimePicker()}
                    />
                    <span style={{ margin: '0 5px', verticalAlign: 'middle' }}>
                      From:
                    </span>
                    <TimeDisplay time={this.state.start.dateTime} />
                  </div>

                  <div
                    className={styles.endTime}
                    onClick={() => this.toggleEndDateTimePicker()}
                  >
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ verticalAlign: 'middle' }}
                    />
                    <span
                      style={{
                        margin: '0 27px 0px 5px',
                        verticalAlign: 'middle',
                      }}
                    >
                      To:
                    </span>
                    <TimeDisplay time={this.state.end.dateTime} />
                  </div>

                  <DateTimePicker
                    value={this.state.start.dateTime}
                    onChange={this.handleStartDateChange}
                    open={this.state.start.show}
                    onOpen={() => this.toggleStartDateTimePicker()}
                    onClose={() => this.toggleStartDateTimePicker()}
                    TextFieldComponent={() => null}
                  />
                  <DateTimePicker
                    value={this.state.end.dateTime}
                    onChange={this.handleEndDateChange}
                    open={this.state.end.show}
                    onOpen={() => this.toggleEndDateTimePicker()}
                    onClose={() => this.toggleEndDateTimePicker()}
                    TextFieldComponent={() => null}
                  />

                  <div style={{ marginTop: '15px' }}>
                    {activity.description}
                  </div>

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
  tripId: PropTypes.string,
};
