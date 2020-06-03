/** @format */

import React from 'react';
import PropTypes from 'prop-types';

export default class Greeting extends React.Component {
  render() {
    const name = this.props.name;
    const date = new Date();
    const hour = date.getHours();

    if (hour > 6 && hour < 12)
      return name ? (
        <h1>Morning {name}!</h1>
      ) : (
        <h1>Good morning and welcome back 🙂</h1>
      );
    if (hour < 18)
      return name ? (
        <h1>Good afternoon, {name}</h1>
      ) : (
        <h1>Good afternoon and welcome back 🙂</h1>
      );

    if (hour < 23)
      return name ? (
        <h1>Good evening, {name}</h1>
      ) : (
        <h1>Good evening and welcome back 🙂</h1>
      );
    else return name ? <h1>{name}, good night</h1> : <h1>Welcome back 🙂</h1>;
  }
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};
