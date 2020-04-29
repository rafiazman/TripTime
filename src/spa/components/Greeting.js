/** @format */

import React from 'react';
import PropTypes from 'prop-types';

export default class Greeting extends React.Component {
  render() {
    const name = this.props.name;
    const hour = new Date().getHours();
    if (hour > 6 && hour < 12)
      return name ? (
        <h1>Morning {name}!</h1>
      ) : (
        <h1>Good Morning and welcome back:)</h1>
      );
    if (hour < 18)
      return name ? (
        <h1>Good Afternoon, {name} :)</h1>
      ) : (
        <h1>Good Afternoon and welcome back:)</h1>
      );
    if (hour < 23)
      return name ? (
        <h1>Good Evening, {name}</h1>
      ) : (
        <h1>Good Evening and welcome back:)</h1>
      );
    else return name ? <h1>{name}, good night</h1> : <h1>Welcome back :)</h1>;
  }
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};
