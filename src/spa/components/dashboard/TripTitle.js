/** @format */

import React from 'react';
import styles from '../../css/trip-summary.module.css';
import PropTypes from 'prop-types';

export default class TripTitle extends React.Component {
  render() {
    return (
      <div className={styles.tripTitleContainer}>
        <h1 className={styles.tripName}>{this.props.name}</h1>
        <p>{this.props.description}</p>
        <div className={'horizontal-list'}>
          {this.props.people.map((person, index) => (
            <div key={index} className={styles.summaryPerson}>
              <div>
                <img
                  src={`${person.avatarPath}`}
                  alt={''}
                  className={'block-avatar'}
                />
              </div>
              <div>{person.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

TripTitle.propTypes = {
  name: PropTypes.string.isRequired,
  people: PropTypes.array.isRequired,
  description: PropTypes.string,
};
