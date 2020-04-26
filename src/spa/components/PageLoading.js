/** @format */

import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

export default class PageLoading extends React.Component {
  render() {
    return (
      <div className='loading-cover'>
        <ReactLoading type='bars' color='#ff4200' />
        <p>{this.props.message}</p>
      </div>
    );
  }
}
PageLoading.propTypes = {
  message: PropTypes.string.isRequired,
};
