/** @format */

import React from 'react';
import styles from '../css/layout.module.css';
import SideBar from './SideBar';
import TopBar from './TopBar';
import ChatBox from './ChatBox';
import Head from 'next/head';

export default function withLayout(Page) {
  return function wrap() {
    return (
      <div className={styles.container}>
        <Head>
          <title>TripTime: Time for our next Adventure</title>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <link
            href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
            rel='stylesheet'
          />
        </Head>
        <SideBar />
        <TopBar />
        <main>
          <Page />
          <ChatBox />
        </main>
      </div>
    );
  };
}
