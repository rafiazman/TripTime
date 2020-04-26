/** @format */

import TopBar from './TopBar';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/layout.module.css';

export default class MainLayout extends React.Component {
  render() {
    return (
      <div className={styles.mainContainer}>
        <TopBar />
        {this.props.children}
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
