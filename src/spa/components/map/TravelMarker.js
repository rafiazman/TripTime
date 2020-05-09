/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../css/map.module.css';

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

export default function TravelMarker(props) {
  const rgb = props.rgb;
  const rgbString = `${rgb[0]},${rgb[1]},${rgb[2]}`;
  const toStyle = {
    border: `2px solid rgb(${rgbString})`,
    color: `rgb(${rgbString})`,
    backgroundColor: `rgba(256, 256, 256, 0.8)`,
  };
  const fromStyle = {
    border: `2px solid white`,
    color: `white`,
    backgroundColor: `rgba(${rgbString}, 0.8)`,
  };
  return (
    <span
      className={styles.travelBubble}
      style={props.isTo ? toStyle : fromStyle}
    >
      <FontAwesomeIcon icon={travelModeIcons[props.travelMode]} />
    </span>
  );
}

TravelMarker.propTypes = {
  travelMode: PropTypes.string.isRequired,
  isTo: PropTypes.bool.isRequired,
  rgb: PropTypes.arrayOf(PropTypes.number).isRequired,
};
