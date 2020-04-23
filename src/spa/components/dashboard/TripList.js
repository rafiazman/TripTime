/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import TripCard from './TripCard';
import styles from '../../css/homepage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class TripList extends React.Component {
  render() {
    const tripInfoList = this.props.tripInfoList;
    return (
      <div className={styles.component}>
        <h2>
          {' '}
          <FontAwesomeIcon icon={this.props.icon} /> {this.props.title}{' '}
        </h2>
        {tripInfoList.length > 0 ? (
          <div>
            {tripInfoList.map((tripInfo, index) => (
              <Link href='/timeline' key={index}>
                <a>
                  <TripCard
                    tripName={tripInfo.trip.name}
                    updated={tripInfo.updated}
                  />
                </a>
              </Link>
            ))}
          </div>
        ) : (
          this.props.displayIfNoTrip
        )}
      </div>
    );
  }
}

TripList.propTypes = {
  displayIfNoTrip: PropTypes.element.isRequired,
  icon: PropTypes.object.isRequired,
  tripInfoList: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
