/** @format */

import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

export default function UpdateProcessing({ message }) {
  return (
    <div className={'center-column'}>
      <ReactLoading type='cylon' color='#ff4200' width='3rem' height={'3rem'} />
      <span style={{ color: '#ff6400', fontWeight: 'bold' }}>{message}</span>
    </div>
  );
}

UpdateProcessing.propTypes = {
  message: PropTypes.string,
};
