/** @format */

import React from 'react';

const topBarImgStyle = {
  width: '2.2rem',
  height: '2.2rem',
  padding: '2px',
};
const topBarSpanStyle = {
  padding: '2px 5px',
  fontSize: '1.5rem',
};
const topBarOptionStyle = {
  fontSize: '1rem',
  fontWeight: 'regular',
  position: 'absolute',
  right: '20px',
  padding: '2px 5px',
};

export default function TopBar() {
  return (
    <header className='top-bar'>
      <img src='/decor-img/top_bar_logo.svg' alt='' style={topBarImgStyle} />
      <span style={topBarSpanStyle}>TripTime!</span>
      <span style={topBarOptionStyle}> Some | Settings | Here </span>
    </header>
  );
}
