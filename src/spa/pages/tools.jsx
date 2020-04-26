/** @format */
import React from 'react';
import Link from 'next/link';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import { AuthContext } from '../contexts/AuthContext';

export default class Tools extends React.Component {
  render() {
    return (
      <AuthContext>
        {({ currentUser }) => (
          <TripTeamLayout user={currentUser}>
            {currentUser ? (
              <div>
                <p>This is the tools</p>
              </div>
            ) : (
              <div className={'fit-center'}>
                <Link href={'login'}>
                  <a> Log in </a>
                </Link>{' '}
                to see the tools
              </div>
            )}
          </TripTeamLayout>
        )}
      </AuthContext>
    );
  }
}
