/** @format */
import React from 'react';
import PropTypes from 'prop-types';
import VisitorLandingPage from '../components/landing/VisitorLandingPage';
import Dashboard from '../components/dashboard/Dashboard';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    this.props.setUser(this);
  }

  render() {
    if (!this.state.user) return <VisitorLandingPage />;
    else return <Dashboard name={this.state.user.name} />;
  }
}

Index.propTypes = {
  setUser: PropTypes.func,
};
