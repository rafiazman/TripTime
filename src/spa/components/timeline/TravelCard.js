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
import NotesCard from '../NotesCard';
import { AuthContext } from '../../contexts/AuthContext';

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
    const travel = this.props.travel;
    return (
      <AuthContext.Consumer>
        {({ currentUser }) => {
          return (
            <div className={styles.travelCard}>
              <span className={styles.travelTitle}>
                <FontAwesomeIcon icon={travelModeIcons[travel.mode]} />{' '}
                {travel.description}
              </span>
              <PeopleList people={travel.people} />
              <div className={styles.time}>
                <span>
                  <FontAwesomeIcon icon={faClock} /> Departs:
                  <TimeDisplay time={travel.start} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faClock} /> Arrives:
                  <TimeDisplay time={travel.end} />
                </span>
              </div>
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
};
