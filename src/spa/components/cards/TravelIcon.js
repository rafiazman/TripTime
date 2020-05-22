/** @format */

import {
  faBicycle,
  faBus,
  faCar,
  faHorse,
  faMotorcycle,
  faPlane,
  faShip,
  faStar,
  faTrain,
  faWalking,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

const travelModes = {
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

function TravelIcon({ mode }) {
  return <FontAwesomeIcon icon={travelModes[mode] || faStar} />;
}

TravelIcon.propTypes = {
  mode: PropTypes.string,
};

export { TravelIcon, travelModes };
