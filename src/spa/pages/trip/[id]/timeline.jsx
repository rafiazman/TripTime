/** @format */
import React from 'react';
import TripSummary from '../../../components/timeline/TripSummary';
import TripTeamLayout from '../../../components/layout/TripTeamLayout';
import PropTypes from 'prop-types';

export default function Timeline(props) {
  return (
    <TripTeamLayout tripID={props.tripID} activeLink={'Timeline'}>
      <TripSummary />
    </TripTeamLayout>
  );
}

Timeline.getInitialProps = ({ query }) => {
  return { tripID: query.id };
};

Timeline.propTypes = {
  tripID: PropTypes.string.isRequired,
};
