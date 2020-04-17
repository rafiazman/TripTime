/** @format */

import React from 'react';
import styles from '../../css/trip-card.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../Tooltip';

export default class TripCard extends React.Component {
  render() {
    const newChatNum =
      this.props.newChatNum < 1
        ? ''
        : this.props.newChatNum > 99
        ? '99+'
        : this.props.newChatNum;
    const newNoteNum =
      this.props.newNoteNum < 1
        ? ''
        : this.props.newNoteNum > 99
        ? '99+'
        : this.props.newNoteNum;

    return (
      <div className={styles.card}>
        <h1>{this.props.tripName}</h1>
        <div className={styles.alerts}>
          {newChatNum && (
            <Tooltip
              text={newChatNum + ' new chat messages'}
              component={
                <span>
                  <FontAwesomeIcon icon={faCommentDots} />
                  {newChatNum}
                </span>
              }
            />
          )}
          {newNoteNum && (
            <Tooltip
              text={newNoteNum + ' new notes'}
              component={
                <span>
                  <FontAwesomeIcon icon={faStickyNote} />
                  {newNoteNum}
                </span>
              }
            />
          )}
        </div>
      </div>
    );
  }
}

TripCard.propTypes = {
  tripName: PropTypes.string.isRequired,
  newChatNum: PropTypes.number.isRequired,
  newNoteNum: PropTypes.number.isRequired,
};
