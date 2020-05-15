/** @format */
import React from 'react';
import TripSummary from '../../../components/timeline/TripSummary';
import TripTeamLayout from '../../../components/layout/TripTeamLayout';
import { AuthContext } from '../../../contexts/AuthContext';
import PropTypes from 'prop-types';

export default function Timeline(props) {
  return (
    <AuthContext.Consumer>
      {({ currentUser, setAnchor }) => (
        <TripTeamLayout
          user={currentUser}
          tripID={props.tripID}
          activeLink={'Timeline'}
        >
          <TripSummary
            tripID={props.tripID}
            user={currentUser}
            setAnchor={setAnchor}
          />
        </TripTeamLayout>
      )}
    </AuthContext.Consumer>
  );
}

Timeline.getInitialProps = ({ query }) => {
  return { tripID: query.id };
};

Timeline.propTypes = {
  tripID: PropTypes.string.isRequired,
};
