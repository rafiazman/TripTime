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
} from '@fortawesome/free-solid-svg-icons';
import EventCard from '../shared-elements/EventCard';

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

export default class MapMarker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardPopped: false,
    };
  }

  toggleCard(component) {
    return () => {
      component.setState(state => ({
        cardPopped: !state.cardPopped,
      }));
    };
  }

  render() {
    return (
      <div className={styles[`mapDummyMarker${this.props.dummyKey}`]}>
        <span className={styles.mapBubble} onClick={this.toggleCard(this)}>
          <FontAwesomeIcon icon={activityTypes[this.props.activity.type]} />
        </span>
        {this.state.cardPopped && (
          <EventCard
            onMap={true}
            onClose={this.toggleCard(this)}
            activity={this.props.activity}
          />
        )}
      </div>
    );
  }
}

MapMarker.propTypes = {
  activity: PropTypes.object.isRequired,
  dummyKey: PropTypes.number,
};
