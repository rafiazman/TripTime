/** @format */

import React from 'react';
import styles from '../../css/trip-summary.module.css';
import PropTypes from 'prop-types';
import PeopleList from '../PeopleList';

export default class TripTitle extends React.Component {
  render() {
    return (
      <div className={styles.tripTitleContainer}>
        <h1 className={styles.tripName}>{this.props.name}</h1>
        <p>{this.props.description}</p>
        <PeopleList people={this.props.people} />
      </div>
    );
  }
}

TripTitle.propTypes = {
  name: PropTypes.string.isRequired,
  people: PropTypes.array.isRequired,
  description: PropTypes.string,
};
