/** @format */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default class Index extends React.Component {
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
        <div>
          <p>
            Welcome,{' '}
            <img
              alt=''
              src={this.state.user.picture}
              className='inline-avatar'
            />
            {this.state.user.nickname}!
          </p>
          <p>You are at the index page (in construction)</p>
        </div>
      );
    else
      return (
        <div>
          Here is the index page. It will be populated.
          <Link href={'api/login'}>
            <a> log in </a>
          </Link>
        </div>
      );
  }
}

Index.propTypes = {
  setUser: PropTypes.func,
};
