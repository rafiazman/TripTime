/** @format */
import React from 'react';
import TripSummary from '../components/timeline/TripSummary';
import trip from '../app/dummy-data/trip';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import PropTypes from 'prop-types';

export default class Timeline extends React.Component {
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

Timeline.propTypes = {
  setUser: PropTypes.func,
};
