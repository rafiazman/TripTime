/** @format */

import React from 'react';
import styles from '../../css/join-form.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import Router from 'next/router';

class JoinUsForm extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ handleEmailInput, userEmail, checkEmailOccupied }) => (
          <form
            className={styles.form}
            onSubmit={e => {
              e.preventDefault();
              checkEmailOccupied(userEmail);
              Router.push('/signup');
            }}
          >
            <input
              type='email'
              placeholder='Enter your email'
              onChange={handleEmailInput}
              value={userEmail}
              required={true}
            />
            <button type='submit' className={styles.enabledLink}>
              Join Today - It&apos;s Free!
            </button>
          </form>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default JoinUsForm;
