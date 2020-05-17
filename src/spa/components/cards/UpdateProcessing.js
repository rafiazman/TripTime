/** @format */

import React from 'react';
import ReactLoading from 'react-loading';

export default function UpdateProcessing() {
  return (
    <div className={'center-column'}>
      <ReactLoading type='cylon' color='#ff4200' width='3rem' height={'3rem'} />
      <span style={{ color: '#ff6400', fontWeight: 'bold' }}>Updating...</span>
    </div>
  );
}
