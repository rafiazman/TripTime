/** @format */
import React from 'react';
import Link from 'next/link';
import TripTeamLayout from '../../../components/layout/TripTeamLayout';
import dynamic from 'next/dynamic';
import { AuthContext } from '../../../contexts/AuthContext';
import PropTypes from 'prop-types';

const TripMapNoSSR = dynamic(() => import('../../../components/map/TripMap'), {
  ssr: false,
});

export default function Map(props) {
  const tripID = props.tripID;
  return (
    <AuthContext.Consumer>
      {({ currentUser, setAnchor }) => (
        <TripTeamLayout user={currentUser} tripID={tripID} activeLink={'Map'}>
          {currentUser ? (
            <TripMapNoSSR tripID={tripID} />
          ) : (
            <div className={'fit-center'}>
              <Link href={'/login'}>
                <a onClick={() => setAnchor(`/trip/${tripID}/map`)}> Log in </a>
              </Link>
              to see the map
            </div>
          )}
        </TripTeamLayout>
      )}
    </AuthContext.Consumer>
  );
}

Map.getInitialProps = ({ query }) => {
  return { tripID: query.id };
};

Map.propTypes = {
  tripID: PropTypes.string.isRequired,
};
