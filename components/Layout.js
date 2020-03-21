/** @format */

import React from 'react';
import styles from '../css/layout.module.css';
import SideBar from './SideBar';
import TopBar from './TopBar';
import ChatBox from './ChatBox';

export default function withLayout(Page) {
  return function wrap() {
    return (
      <div className={styles.container}>
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
