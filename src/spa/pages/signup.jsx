/** @format */

import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next/router';
import styles from '../css/auth.module.css';
import PageLoading from '../components/PageLoading';
import { DebounceInput } from 'react-debounce-input';

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
            handleEmailInput,
            checkEmailOccupied,
            emailOccupied,
            handleUserNameInput,
            handleUserPassword,
            handleUserPasswordConfirm,
            passwordConfirmed,
            errorMessage,
            userPassword,
            userNameInput,
            userConfirmedPassword,
          }) => {
            if (currentUser) Router.push('/');

            return (
              <div className={styles.regFormContainer}>
                {errorMessage ? (
                  <div className={styles.failed}>
                    <p>
                      Sorry, we failed to create an account for you because:
                    </p>
                    <p>{errorMessage}</p>
                    <p>Please try again:</p>
                  </div>
                ) : (
                  <h1>
                    <img src='/img/logo.svg' className={styles.logo} alt='' />
                    Hey, nice to have you joining us :)
                  </h1>
                )}
                <form
                  className={styles.regForm}
                  onSubmit={async e => {
                    e.preventDefault();
                    setLoading(true);
                    await signup();
                    setLoading(false);
                  }}
                >
                  <label>
                    Enter your Email Address:
                    <DebounceInput
                      type='email'
                      name='email'
                      required={true}
                      debounceTimeout={300}
                      onChange={event => {
                        handleEmailInput(event);
                        checkEmailOccupied(event.target.value);
                      }}
                      value={userEmail}
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
                      value={userNameInput}
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
                      value={userPassword}
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
                      value={userConfirmedPassword}
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
