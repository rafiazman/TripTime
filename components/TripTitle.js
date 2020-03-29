/** @format */

import React from 'react';
import styles from '../css/trip-summary.module.css';
import PropTypes from 'prop-types';

export default class TripTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tripName = this.props.name;
    const people = this.props.people;

    return (
      <div className={styles.tripTitleContainer}>
        <h1>{tripName}</h1>
        {people.map((person, index) => (
          <div key={index}>
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
    );
  }
}

TripTitle.propTypes = {
  name: PropTypes.string.isRequired,
  people: PropTypes.array.isRequired,
};
