/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import style from '../css/trip-tag.module.css';

export default function TripTag({ tagName, isActive }) {
  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.8)), 
    url('/tag-img/${tagName.toLowerCase()}-tag.jpg')`,
  };

  const activeBackgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(255,66,0,0.8), rgba(255,66,0,0.8)), 
    url('/tag-img/${tagName.toLowerCase()}-tag.jpg')`,
  };

  return (
    <div
      className={isActive ? style.active : style.tag}
      style={isActive ? activeBackgroundStyle : backgroundImageStyle}
    >
      <span className={style.name}>{tagName}</span>
    </div>
  );
}

TripTag.propTypes = {
  tagName: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};
