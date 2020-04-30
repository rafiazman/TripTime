/** @format */

import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next/router';
import styles from '../css/auth.module.css';
import PageLoading from '../components/PageLoading';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  render() {
    const setLoading = isLoading => {
      this.setState(() => ({ loading: isLoading }));
    };
    return (
      <>
        {this.state.loading && (
          <PageLoading message='TripTime is creating an account for you :)' />
        )}
        <AuthContext.Consumer>
          {({
            signup,
            currentUser,
            userEmail,
            handleNewEmail,
            emailOccupied,
            handleUserNameInput,
            handleUserPassword,
            handleUserPasswordConfirm,
            passwordConfirmed,
          }) => {
            if (currentUser) Router.push('/');
            return (
              <div className={styles.regFormContainer}>
                <h1>
                  <img src='/img/logo.svg' className={styles.logo} alt='' />
                  Hey, nice to have you joining us :)
                </h1>
                <form
                  className={styles.regForm}
                  onSubmit={e => {
                    e.preventDefault();
                    setLoading(true);
                    signup();
                  }}
                >
                  <label>
                    Enter your Email Address:
                    <input
                      type='email'
                      defaultValue={userEmail}
                      required={true}
                      onChange={handleNewEmail}
                      name='email'
                    />
                  </label>
                  {emailOccupied && (
                    <div className={styles.invalidAlert}>
                      Sorry, this email address has been occupied. Try another
                      one?
                    </div>
                  )}
                  <label>
                    Enter your Nickname:
                    <input
                      type='name'
                      required={true}
                      minLength={3}
                      maxLength={14}
                      name='nickname'
                      onChange={handleUserNameInput}
                    />
                  </label>
                  <label>
                    Create your Password:
                    <input
                      type='password'
                      required={true}
                      minLength={6}
                      maxLength={20}
                      name='password'
                      onChange={handleUserPassword}
                    />
                  </label>
                  <label>
                    Confirm your Password:
                    <input
                      type='password'
                      required={true}
                      minLength={6}
                      maxLength={20}
                      name='confirm-password'
                      onChange={handleUserPasswordConfirm}
                    />
                  </label>
                  {!passwordConfirmed && (
                    <div className={styles.invalidAlert}>
                      Sorry, the two passwords you entered do not match!
                    </div>
                  )}
                  <input
                    value='Register'
                    type='submit'
                    disabled={!passwordConfirmed || emailOccupied}
                    className={styles.regSubmit}
                  />
                </form>
              </div>
            );
          }}
        </AuthContext.Consumer>
      </>
    );
  }
}
