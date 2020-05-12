/** @format */
import React from 'react';
import Link from 'next/link';
import TripTeamLayout from '../../../components/layout/TripTeamLayout';
import dynamic from 'next/dynamic';
import { AuthContext } from '../../../contexts/AuthContext';
import { useRouter } from 'next/router';

const TripMapNoSSR = dynamic(() => import('../../../components/map/TripMap'), {
  ssr: false,
});

export default function Map() {
  const tripID = useRouter().query.id;
  return (
    <AuthContext.Consumer>
      {({ currentUser }) => (
        <TripTeamLayout user={currentUser} tripID={tripID} activeLink={'Map'}>
          {currentUser ? (
            <TripMapNoSSR tripID={tripID} />
          ) : (
            <div className={'fit-center'}>
              <Link href={'/login'}>
                <a> Log in </a>
              </Link>
              to see the map
            </div>
          )}
        </TripTeamLayout>
      )}
    </AuthContext.Consumer>
  );
}
