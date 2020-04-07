/** @format */

import '../css/global.css';
import React from 'react';
import PropTypes from 'prop-types';
import '../css/leaflet.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};
