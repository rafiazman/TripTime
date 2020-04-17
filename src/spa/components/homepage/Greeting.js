/** @format */

import React from 'react';
import PropTypes from 'prop-types';

export default class Greeting extends React.Component {
  render() {
    const hour = new Date().getHours();
    if (hour > 6 && hour < 12) return <h1>Morning {this.props.name}!</h1>;
    if (hour < 18) return <h1>Good Afternoon, {this.props.name} :)</h1>;
    if (hour < 23) return <h1>Good Evening, {this.props.name}</h1>;
    else return <h1>{this.props.name}, good night</h1>;
  }
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};
