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
            checkNameOccupied,
            nameOccupied,
            handleUserPassword,
            handleUserPasswordConfirm,
            passwordConfirmed,
            errorMessage,
            userPassword,
            userNameInput,
            userConfirmedPassword,
            redirectTo,
          }) => {
            if (currentUser) Router.push(redirectTo);

            return (
              <div className={styles.regFormContainer}>
                {errorMessage ? (
                  <div className='failed'>
                    <p>
                      Sorry, we failed to create an account for you because:
                    </p>
                    <p>{errorMessage}</p>
                    <p>Please try again:</p>
                  </div>
                ) : (
                  <h1 className='form-title'>
                    <img src='/img/logo.svg' alt='' />
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
                      debounceTimeout={400}
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
                      one?`
                    </div>
                  )}
                  <label>
                    Enter your Nickname:
                    <DebounceInput
                      type='name'
                      required={true}
                      minLength={3}
                      maxLength={14}
                      name='nickname'
                      debounceTimeout={400}
                      onChange={event => {
                        handleUserNameInput(event);
                        checkNameOccupied(event.target.value);
                      }}
                      value={userNameInput}
                    />
                  </label>
                  {nameOccupied && (
                    <div className={styles.invalidAlert}>
                      Sorry, this nickname has been occupied. Try another one?
                    </div>
                  )}
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
                    disabled={
                      !passwordConfirmed || emailOccupied || nameOccupied
                    }
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
