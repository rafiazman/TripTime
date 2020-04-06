/** @format */

import '../css/global.css';
import React from 'react';
import App from 'next/app';
import MainLayout from '../components/layout/MainLayout';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import '../css/leaflet.css';

export default class MyApp extends App {
  setUser() {
    return async component => {
      fetch('/api/me')
        .then(response => (response.ok ? response.json() : null))
        .then(user =>
          component.setState(() => {
            return { user: user };
          }),
        );
    };
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
        </Head>
        <MainLayout setUser={this.setUser()}>
          <Component {...pageProps} setUser={this.setUser()} />
        </MainLayout>
      </>
    );
  }
}
