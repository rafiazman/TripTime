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
} from '@fortawesome/free-solid-svg-icons';
import PeopleList from '../PeopleList';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import TimeDisplay from '../TimeDisplay';

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
  render() {
    const travel = this.props.travel;
    return (
      <div className={styles.travelCard}>
        <span className={styles.travelTitle}>
          <FontAwesomeIcon icon={travelModeIcons[travel.mode]} />{' '}
          {travel.description}
        </span>
        <PeopleList people={travel.people} />
        <div className={styles.time}>
          <span>
            <FontAwesomeIcon icon={faClock} /> Depart At:
            <TimeDisplay time={travel.start} />
          </span>
          <span>
            <FontAwesomeIcon icon={faClock} /> Arrive At:
            <TimeDisplay time={travel.end} />
          </span>
        </div>
      </div>
    );
  }
}

TravelCard.propTypes = {
  travel: PropTypes.object.isRequired,
};
