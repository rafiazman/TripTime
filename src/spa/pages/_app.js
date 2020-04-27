/** @format */

import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import '../css/global.css';
import '../css/react-leaflet-geosearch.css';
import '../css/leaflet.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

import MainLayout from '../components/layout/MainLayout';
import { AuthProvider } from '../contexts/AuthContext';

export default class MyApp extends App {
  constructor() {
    super();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>TripTime: Time for our next Adventure</title>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600&display=swap'
            rel='stylesheet'
          />
        </Head>

        <AuthProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthProvider>
      </>
    );
  }
}
