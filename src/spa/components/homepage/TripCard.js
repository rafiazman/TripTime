/** @format */

import React from 'react';
import styles from '../../css/trip-card.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../Tooltip';

export default class TripCard extends React.Component {
  render() {
    return (
      <div className={styles.card}>
        <h1>{this.props.tripName}</h1>
        <div className={styles.alerts}>
          {this.generateAlert(this.props.updated)}
        </div>
      </div>
    );
  }

  generateAlert(updated) {
    if (!updated) return '';
    return (
      <Tooltip
        text={'Trip updated since you last checked'}
        component={
          <span>
            <FontAwesomeIcon icon={faCircle} />
          </span>
        }
      />
    );
  }
}

TripCard.propTypes = {
  tripName: PropTypes.string.isRequired,
  updated: PropTypes.bool.isRequired,
};
