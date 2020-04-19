/** @format */
import React from 'react';
import activities from '../app/dummy-data/activities';
import travels from '../app/dummy-data/travel-between';
import PropTypes from 'prop-types';
import Link from 'next/link';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import dynamic from 'next/dynamic';
import { AuthContext } from '../contexts/AuthContext';

const TripMapNoSSR = dynamic(() => import('../components/map/TripMap'), {
  ssr: false,
});

export default class Map extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ currentUser }) => (
          <TripTeamLayout user={currentUser}>
            {currentUser ? (
              <TripMapNoSSR activities={activities} travels={travels} />
            ) : (
              <div className={'fit-center'}>
                <Link href={'login'}>
                  <a> Log in </a>
                </Link>{' '}
                to see the map
              </div>
            )}
          </TripTeamLayout>
        )}
      </AuthContext.Consumer>
    );
  }
}

Map.propTypes = {
  setUser: PropTypes.func,
};
