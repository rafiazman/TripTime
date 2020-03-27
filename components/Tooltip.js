/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/tooltip.module.css';

function Tooltip({ component, text }) {
  return (
    <div className={styles.tooltip}>
      {component}
      <div className={styles.text}>{text}</div>
    </div>
  );
}

Tooltip.propTypes = {
  component: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default Tooltip;
