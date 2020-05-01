/** @format */
import React from 'react';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import { AuthContext } from '../contexts/AuthContext';

export default class Tools extends React.Component {
  render() {
    return (
      <AuthContext>
        {({ currentUser }) => (
          <TripTeamLayout user={currentUser}>
            <div style={{ fontSize: '1.25rem' }}>
              <p>Hi {currentUser && currentUser.name},</p>
              <p>Sorry you have reached a page under construction.</p>
              <p>
                The developers of TripTime will work hard to deliver this page
                to you in the next version.
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
}
