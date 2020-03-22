/** @format */

import React from 'react';

const topBarImgStyle = {
  width: '2em',
  height: '2em'
};

const topBarSpanStyle ={
  padding: '2px 5px'
};
const topBarOptionStyle = {
  fontSize: '0.8em',
  fontWeight:'regular',
  position: 'absolute',
  right: '20px',
  padding: '2px 5px'

};

export default function TopBar() {
  return <header className='top-bar'>
    <span style={topBarSpanStyle}> <img src='/decor-img/top_bar_logo.svg' alt='' style={topBarImgStyle}/>
    </span>
    <span style={topBarSpanStyle}>TripTime</span>
    <span style={topBarOptionStyle}> Some | Settings | Here </span>
    </header>;
}

