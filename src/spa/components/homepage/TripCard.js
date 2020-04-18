/** @format */

import React from 'react';
import styles from '../../css/trip-card.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../Tooltip';

export default class TripCard extends React.Component {
  render() {
    return (
      <div className={styles.card}>
        <h1>{this.props.tripName}</h1>
        <div className={styles.alerts}>
          {this.generateAlert(
            this.props.newChatNum,
            'new chat messages',
            faCommentDots,
          )}
          {this.generateAlert(this.props.newNoteNum, 'new notes', faStickyNote)}
        </div>
      </div>
    );
  }

  generateAlert(count, text, icon) {
    if (count < 1) return '';
    const countDisplay = count > 99 ? '99+' : count;
    return (
      <Tooltip
        text={countDisplay + ' ' + text}
        component={
          <span>
            <FontAwesomeIcon icon={icon} />
            {countDisplay}
          </span>
        }
      />
    );
  }
}

TripCard.propTypes = {
  tripName: PropTypes.string.isRequired,
  newChatNum: PropTypes.number.isRequired,
  newNoteNum: PropTypes.number.isRequired,
};
