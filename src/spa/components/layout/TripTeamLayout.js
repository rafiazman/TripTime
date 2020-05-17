/** @format */

import React from 'react';
import styles from '../../css/layout.module.css';
import SideBar from './SideBar';
import ChatBox from '../chat/ChatBox';
import PropTypes from 'prop-types';
import { AuthContext } from '../../contexts/AuthContext';

export default function TripTeamLayout({ activeLink, children }) {
  return (
    <div className={styles.tripTeamContainer}>
      <SideBar activeLink={activeLink} />
      <main>
        {children}
        <AuthContext.Consumer>
          {({ currentUser }) => currentUser && <ChatBox />}
        </AuthContext.Consumer>
      </main>
    </div>
  );
}

TripTeamLayout.propTypes = {
  children: PropTypes.node.isRequired,
  activeLink: PropTypes.string.isRequired,
};
