/** @format */

import React from 'react';
import styles from '../../css/join-form.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import Router from 'next/router';

class JoinUsForm extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ handleUserEmail, emailOccupied }) => (
          <form
            className={styles.form}
            onSubmit={e => {
              e.preventDefault();
              Router.push('/signup');
            }}
          >
            <input
              type='email'
              placeholder='Enter your email'
              onChange={handleUserEmail}
              required={true}
            />
            <button
              disabled={emailOccupied}
              type='submit'
              className={
                emailOccupied ? styles.disabledLink : styles.enabledLink
              }
            >
              Join Today - It&apos;s Free!
            </button>

            {emailOccupied && (
              <div className={styles.occupyAlert}>
                Sorry, this email address has been occupied. Try another one?
              </div>
            )}
          </form>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default JoinUsForm;
