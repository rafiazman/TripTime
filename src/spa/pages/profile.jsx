/** @format */

import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    this.props.setUser(this);
  }

  render() {
    if (this.state.user)
      return (
        <div style={{ width: '50%', margin: '0 auto' }}>
          <h1>Profile Page</h1>
          <Link href={'/dashboard'}>
            <a>Go to your trip</a>
          </Link>
          <p>Welcome to the Profile Page! Here is your profile information:</p>
          <p>{JSON.stringify(this.state.user)}</p>
        </div>
      );
    else return null;
  }
}
Profile.propTypes = {
  setUser: PropTypes.func,
};
