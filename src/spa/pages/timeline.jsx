/** @format */
import React from 'react';
import TripSummary from '../components/timeline/TripSummary';
import trip from '../app/dummy-data/trip';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import { AuthContext } from '../contexts/AuthContext';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ currentUser }) => (
          <TripTeamLayout user={currentUser}>
            <TripSummary trip={trip} user={currentUser} />
          </TripTeamLayout>
        )}
      </AuthContext.Consumer>
    );
  }
}
