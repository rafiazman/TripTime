/** @format */
import React from 'react';
import VisitorLandingPage from '../components/landing/VisitorLandingPage';
import Dashboard from '../components/dashboard/Dashboard';
import { AuthContext } from '../contexts/AuthContext';
import {
  LOGGED_IN,
} from '../constants/AuthStatus';


import axios from 'axios';

export default class Index extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  loadCurrentUser(authContext){
    if (authContext.getAuthStatus() === LOGGED_IN) {
      this.setState(()=> ({
        user: {
          name: authContext.userName,
          id: authContext.userID
        }
      }))
    }
  }

  componentDidMount() {
    this.loadCurrentUser(this.context)
  }

  render() {
    const authContext = this.context;

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
