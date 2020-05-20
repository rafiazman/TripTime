/** @format */

import React from 'react';
import styles from '../../css/map.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlassCheers,
  faHiking,
  faMusic,
  faUtensils,
  faDice,
  faDemocrat,
  faBinoculars,
  faHatWizard,
  faLandmark,
  faPalette,
  faPaw,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

const activityTypes = {
  outdoors: faHiking,
  eating: faUtensils,
  scenery: faBinoculars,
  gathering: faGlassCheers,
  music: faMusic,
  gamble: faDice,
  play: faDemocrat,
  fantasy: faHatWizard,
  landmark: faLandmark,
  art: faPalette,
  animal: faPaw,
  empty: faStar,
};

export default function ActivityMarker(props) {
  return (
    <span className={styles.activityBubble}>
      <FontAwesomeIcon icon={activityTypes[props.activityType]} />
    </span>
  );
}

ActivityMarker.propTypes = {
  activityType: PropTypes.string.isRequired,
};
