/** @format */
import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../css/auth.module.css';
import Router from 'next/router';
import PageLoading from '../components/PageLoading';
import Greeting from '../components/Greeting';
import Link from 'next/link';

export default class Login extends React.Component {
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
          <PageLoading message='Welcome! TripTime is logging you in 🙂' />
        )}
        <AuthContext.Consumer>
          {({
            login,
            handleEmailInput,
            handleUserPassword,
            currentUser,
            errorMessage,
            redirectTo,
          }) => {
            if (currentUser) Router.push(redirectTo);
            else
              return (
                <div className={styles.formContainer}>
                  {errorMessage ? (
                    <div className={'failed'}>
                      <p>Sorry, we failed to log in for you because:</p>
                      <p>{errorMessage}</p>
                      <p>Please try again:</p>
                    </div>
                  ) : (
                    <Greeting name='' />
                  )}

                  <form
                    className={styles.loginForm}
                    onSubmit={async e => {
                      e.preventDefault();
                      setLoading(true);
                      await login();
                      setLoading(false);
                    }}
                  >
                    <label>
                      Email <input type='email' onChange={handleEmailInput} />
                    </label>
                    <label>
                      Password
                      <input type='password' onChange={handleUserPassword} />
                    </label>
                    <input
                      type='submit'
                      value='Log in'
                      className={styles.loginSubmit}
                    />
                    <Link href='/signup'>
                      <a className={styles.registerLink}>Create New Account</a>
                    </Link>
                  </form>
                </div>
              );
          }}
        </AuthContext.Consumer>
      </>
    );
  }
}
