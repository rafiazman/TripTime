/** @format */
import React from 'react';
import TripSummary from '../../../components/timeline/TripSummary';
import TripTeamLayout from '../../../components/layout/TripTeamLayout';
import { AuthContext } from '../../../contexts/AuthContext';
import PropTypes from 'prop-types';

export default function Timeline(props) {
  return (
    <AuthContext.Consumer>
      {({ currentUser }) => (
        <TripTeamLayout user={currentUser} tripID={props.tripID}>
          <TripSummary tripID={props.tripID} user={currentUser} />
        </TripTeamLayout>
      )}
    </AuthContext.Consumer>
  );
}

Timeline.getInitialProps = ({ query }) => {
  return { tripID: query.id };
};

Timeline.propTypes = {
  tripID: PropTypes.number.isRequired,
};
