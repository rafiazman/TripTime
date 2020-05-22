/** @format */

import {
  faBinoculars,
  faDemocrat,
  faDice,
  faGlassCheers,
  faHatWizard,
  faHiking,
  faLandmark,
  faMusic,
  faPalette,
  faPaw,
  faUtensils,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

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
};

function ActivityIcon({ type }) {
  return <FontAwesomeIcon icon={activityTypes[type] || faStar} />;
}

ActivityIcon.propTypes = {
  type: PropTypes.string,
};

export { ActivityIcon, activityTypes };
