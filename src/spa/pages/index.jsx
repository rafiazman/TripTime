/** @format */
import React from 'react';
import VisitorLandingPage from '../components/landing/VisitorLandingPage';
import Dashboard from '../components/dashboard/Dashboard';
import { AuthContext } from '../contexts/AuthContext';

export default class Index extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ currentUser }) => {
          if (!currentUser) return <VisitorLandingPage />;
          else return <Dashboard name={currentUser.name} />;
        }}
      </AuthContext.Consumer>
    );
  }
}
