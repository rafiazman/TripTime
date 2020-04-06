/** @format */
import React from 'react';
import TripSummary from '../components/dashboard/TripSummary';
import trip from '../dummy-data/trip';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import PropTypes from 'prop-types';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    this.props.setUser(this);
  }

  render() {
    return (
      <TripTeamLayout user={this.state.user}>
        <TripSummary trip={trip} user={this.state.user} />
      </TripTeamLayout>
    );
  }
}

Dashboard.propTypes = {
  setUser: PropTypes.func,
};
