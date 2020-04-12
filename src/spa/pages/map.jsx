/** @format */
import React from 'react';
import activities from '../app/dummy-data/activities';
import TripMap from '../components/map/TripMap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import TripTeamLayout from '../components/layout/TripTeamLayout';

export default class Map extends React.Component {
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
        {this.state.user ? (
          <TripMap activities={activities} />
        ) : (
          <div className={'fit-center'}>
            <Link href={'api/login'}>
              <a> Log in </a>
            </Link>{' '}
            to see the map
          </div>
        )}
      </TripTeamLayout>
    );
  }
}

Map.propTypes = {
  setUser: PropTypes.func,
};
