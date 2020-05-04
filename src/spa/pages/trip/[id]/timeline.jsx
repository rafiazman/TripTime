/** @format */
import React from 'react';
import TripSummary from '../../../components/timeline/TripSummary';
import TripTeamLayout from '../../../components/layout/TripTeamLayout';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function Timeline(props) {
  return (
    <AuthContext.Consumer>
      {({ currentUser }) => (
        <TripTeamLayout user={currentUser} tripID={props.trip.id}>
          <TripSummary trip={props.trip} user={currentUser} />
        </TripTeamLayout>
      )}
    </AuthContext.Consumer>
  );
}

Timeline.getInitialProps = async ctx => {
  const hostName = process.env.API_HOSTNAME;
  const tripID = ctx.query.id;
  const res = await axios.get(`${hostName}/api/trip/${tripID}`);
  return { trip: { ...res.data, id: Number(tripID) } };
};

Timeline.propTypes = {
  trip: PropTypes.object.isRequired,
};
