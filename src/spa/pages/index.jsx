/** @format */
import React from 'react';
import PropTypes from 'prop-types';
import VisitorLandingPage from '../components/landing/VisitorLandingPage';
import Dashboard from '../components/dashboard/Dashboard';
import { AuthContext } from '../contexts/AuthContext';

import axios from 'axios';

export default class Index extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    this.props.setUser(this);
  }

  render() {
    const authContext = this.context;
    // authContext.getAuthStatus() will perform a HTTP GET to check logged in status
    // authContext.authStatus will get the logged in status from pure JavaScript, however I faced issues
    // with getting this to remember the state throughout the Next.js app, so I do not recommend using this

    if (!this.state.user)
      return (
        <>
          <form
            onSubmit={e => {
              e.preventDefault();
              authContext.login();
            }}
          >
            <input type='text' onChange={authContext.handleUserEmail} />
            <input type='password' onChange={authContext.handleUserPassword} />

            <input type='submit' />
          </form>
          <div className='container'>
            <button onClick={() => axios.get('http://localhost:8080/api/user')}>
              Call API
            </button>
            <button onClick={() => authContext.logout()}>Logout</button>
          </div>

          <VisitorLandingPage />
        </>
      );
    else return <Dashboard name={this.state.user.name} />;
  }
}

Index.propTypes = {
  setUser: PropTypes.func,
};
