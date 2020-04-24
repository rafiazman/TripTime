/** @format */
import React from 'react';
import TripSummary from '../components/timeline/TripSummary';
import trip from '../app/dummy-data/trip';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import PropTypes from 'prop-types';
import { LOGGED_IN, NOT_LOGGED_IN } from '../constants/AuthStatus';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = { authStatus: NOT_LOGGED_IN };
  }

  componentDidMount() {
    // this.props.setUser(this);
    const authContext = this.context;
    this.setState({ authStatus: authContext.getAuthStatus() });
  }

  render() {
    switch (this.state.authStatus) {
      case LOGGED_IN:
        return (
          <TripTeamLayout user={{}}>
            <TripSummary trip={trip} user={{}} />
          </TripTeamLayout>
        );
      case NOT_LOGGED_IN:
      default:
        return <p>Youre not logged in</p>;
    }
  }
}

Timeline.propTypes = {
  setUser: PropTypes.func,
};
