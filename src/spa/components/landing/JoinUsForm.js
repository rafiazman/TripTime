/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/join-form.module.css';

class JoinUsForm extends React.Component {
  render() {
    return (
      <form className={styles.form}>
        <input type='email' placeholder='Enter your email' />
        <button type='submit'>Join Today - It&apos;s Free!</button>
      </form>
    );
  }
}

JoinUsForm.propTypes = {
  invitation: PropTypes.string.isRequired,
};

export default JoinUsForm;
