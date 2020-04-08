/** @format */

import React from 'react';
import styles from '../../css/layout.module.css';
import SideBar from './SideBar';
import ChatBox from '../ChatBox';
import PropTypes from 'prop-types';

export default class TripTeamLayout extends React.Component {
  render() {
    return (
      <div className={styles.tripTeamContainer}>
        <SideBar />
        <main>
          {this.props.children}
          {this.props.user && <ChatBox />}
        </main>
      </div>
    );
  }
}

TripTeamLayout.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.any,
};
