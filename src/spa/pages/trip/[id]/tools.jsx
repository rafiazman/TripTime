/** @format */
import React from 'react';
import TripTeamLayout from '../../../components/layout/TripTeamLayout';
import { AuthContext } from '../../../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function Tools() {
  const tripID = useRouter().query.id;
  return (
    <AuthContext>
      {({ currentUser }) => (
        <TripTeamLayout user={currentUser} tripID={tripID}>
          <div style={{ fontSize: '1.25rem' }}>
            <p>Hi {currentUser && currentUser.name},</p>
            <p>Sorry you have reached a page under construction.</p>
            <p>
              The developers of TripTime will work hard to deliver this page to
              you in the next version.
            </p>
            <p>
              We hope you enjoy other features of TripTime in the mean time!
            </p>
          </div>
        </TripTeamLayout>
      )}
    </AuthContext>
  );
}
