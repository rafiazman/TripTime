/** @format */

import React from 'react';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';

export default class Profile extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ currentUser }) => {
          if (currentUser)
            return (
              <div style={{ width: '50%', margin: '0 auto' }}>
                <h1>Profile Page</h1>
                <Link href={'/timeline'}>
                  <a>Go to your trip</a>
                </Link>
                <p>
                  Welcome to the Profile Page! Here is your profile information:
                </p>
                <p>{JSON.stringify(currentUser)}</p>
              </div>
            );
          else return <p>You are not logged in. No profile to show.</p>;
        }}
      </AuthContext.Consumer>
    );
  }
}
