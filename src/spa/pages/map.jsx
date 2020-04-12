/** @format */
import React from 'react';
import activities from '../app/dummy-data/activities';
import PropTypes from 'prop-types';
import Link from 'next/link';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import dynamic from "next/dynamic";


const TripMapNoSSR = dynamic(
  () => import('../components/map/TripMap'),
  { ssr: false }
)

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
          <TripMapNoSSR activities={activities} />
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
