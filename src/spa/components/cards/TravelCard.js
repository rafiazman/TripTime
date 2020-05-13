/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/travel-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWalking,
  faBus,
  faPlane,
  faCar,
  faShip,
  faMotorcycle,
  faBicycle,
  faTrain,
  faHorse,
  faChevronCircleUp,
  faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import PeopleList from '../PeopleList';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import TimeDisplay from '../TimeDisplay';
import Tooltip from '../Tooltip';
import NotesCard from './NotesCard';
import { AuthContext } from '../../contexts/AuthContext';
import { DateTimePicker } from '@material-ui/pickers';
import axios from 'axios';

const travelModeIcons = {
  bus: faBus,
  plane: faPlane,
  car: faCar,
  ship: faShip,
  motorcycle: faMotorcycle,
  train: faTrain,
  bicycle: faBicycle,
  walk: faWalking,
  horse: faHorse,
};

export default class TravelCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: {
        show: false,
        dateTime: props.travel.start,
      },
      end: {
        show: false,
        dateTime: props.travel.end,
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

  handleStartDateChange = newDate => {
    const tripId = this.props.tripId;

    axios
      .patch(`${process.env.API_HOSTNAME}/api/trip/${tripId}/travels`, {
        id: this.props.travel.id,
        from: { time: newDate.format() },
      })
      .then(res => {
        this.setState(state => ({
          start: {
            ...state.start,
            dateTime: res.data.travel.start,
          },
        }));
      })
      .catch(err => {
        alert(
          'Error: Failed to update start date. \nCheck console for details.',
        );
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  handleEndDateChange = newDate => {
    const tripId = this.props.tripId;

    axios
      .patch(`${process.env.API_HOSTNAME}/api/trip/${tripId}/travels`, {
        id: this.props.travel.id,
        to: { time: newDate.format() },
      })
      .then(res => {
        this.setState(state => ({
          end: {
            ...state.end,
            dateTime: res.data.travel.end,
          },
        }));
      })
      .catch(err => {
        alert(
          'Error: Failed to update start date. \nCheck console for details.',
        );
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  render() {
    const travel = this.props.travel;
    return (
      <AuthContext.Consumer>
        {({ currentUser }) => {
          return (
            <div className={styles.travelCard}>
              <div className={styles.travelTitle}>
                <FontAwesomeIcon
                  icon={travelModeIcons[travel.mode]}
                  style={{ verticalAlign: 'middle', margin: '0 5px 0 0' }}
                />
                <span style={{ verticalAlign: 'middle' }}>
                  {travel.description}
                </span>
              </div>

              <PeopleList people={travel.people} />

              <div
                className={styles.time}
                style={{ marginBottom: '10px', marginTop: '5px' }}
              >
                <div>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ verticalAlign: 'middle' }}
                    onClick={() => this.toggleStartDateTimePicker()}
                  />
                  <span style={{ margin: '0 5px', verticalAlign: 'middle' }}>
                    Departs:
                  </span>
                  <TimeDisplay time={this.state.start.dateTime} />
                </div>

                <div>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ verticalAlign: 'middle' }}
                    onClick={() => this.toggleEndDateTimePicker()}
                  />
                  <span style={{ margin: '0 5px', verticalAlign: 'middle' }}>
                    Arrives:
                  </span>
                  <TimeDisplay time={this.state.end.dateTime} />
                </div>
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

              <div className={styles.options}>
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

              {this.state.notePopped && (
                <NotesCard
                  notes={travel.notes}
                  me={currentUser}
                  className={styles.noteCard}
                />
              )}
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

TravelCard.propTypes = {
  travel: PropTypes.object.isRequired,
  tripId: PropTypes.string,
};
