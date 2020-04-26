/** @format */
import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../css/login.module.css';
import Router from 'next/router';
import PageLoading from '../components/PageLoading';

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
          <PageLoading message='Welcome! TripTime is logging you in :)' />
        )}
        <AuthContext.Consumer>
          {({ login, handleUserEmail, handleUserPassword, currentUser }) => {
            if (currentUser) Router.push('/');
            else
              return (
                <div className={styles.formContainer}>
                  <form
                    onSubmit={async e => {
                      e.preventDefault();
                      setLoading(true);
                      login();
                    }}
                  >
                    <input type='text' onChange={handleUserEmail} />
                    <input type='password' onChange={handleUserPassword} />
                    <input type='submit' value='Log in' />
                  </form>
                </div>
              );
          }}
        </AuthContext.Consumer>
      </>
    );
  }
}
