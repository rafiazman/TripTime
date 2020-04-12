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
      </div>
    );
  }
}

TravelCard.propTypes = {
  travel: PropTypes.object.isRequired,
};
