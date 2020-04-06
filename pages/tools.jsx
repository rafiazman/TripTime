/** @format */
import React from 'react';
import Link from 'next/link';
import TripTeamLayout from '../components/layout/TripTeamLayout';
import PropTypes from 'prop-types';

export default class Tools extends React.Component {
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
          <div>
            <p>This is the tools</p>
          </div>
        ) : (
          <div className={'fit-center'}>
            <Link href={'api/login'}>
              <a> Log in </a>
            </Link>{' '}
            to see the tools
          </div>
        )}
      </TripTeamLayout>
    );
  }
}

Tools.propTypes = {
  setUser: PropTypes.func,
};
