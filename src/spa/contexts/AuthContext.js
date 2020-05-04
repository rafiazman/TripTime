/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  NOT_LOGGED_IN,
  LOG_IN_FORM,
  SIGN_UP_FORM,
  LOGGED_IN,
} from '../constants/AuthStatus';
import PageLoading from '../components/PageLoading';

const AuthContext = React.createContext(undefined, undefined);
const AuthProvider = props => {
  const hostName = process.env.API_HOSTNAME;

  const [authStatus, setAuthStatus] = useState(NOT_LOGGED_IN);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userNameInput, setUserNameInput] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailOccupied, setEmailOccupied] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(true);
  const [userConfirmedPassword, setUserConfirmedPassword] = useState('');

  useEffect(() => {
    if (!currentUser) {
      axios.defaults.withCredentials = true;
      loadCurrentAuthStatus();
    }
  }, []);

  function loadCurrentAuthStatus() {
    setLoading(true);
    axios
      .get(hostName + '/api/user')
      .then(
        response => {
          setCurrentUser({
            id: response.data.id,
            name: response.data.name,
            avatarPath: response.data.avatarPath,
          });
          setErrorMessage('');
          setAuthStatus(LOGGED_IN);
        },
        () => {
          setCurrentUser(null);
          setAuthStatus(NOT_LOGGED_IN);
        },
      )
      .then(() => {
        setLoading(false);
      });
  }

  function changeAuthStatusLogin() {
    setAuthStatus(LOG_IN_FORM);
  }

  function changeAuthStatusSignup() {
    setAuthStatus(SIGN_UP_FORM);
  }

  function handleUserNameInput(changeEvent) {
    let updatedUserName = changeEvent.target.value;
    setUserNameInput(updatedUserName);
  }

  function checkEmailOccupied(email) {
    axios
      .head(`${hostName}/api/user/email/${email}`)
      .then(() => {
        setEmailOccupied(true);
      })
      .catch(() => {
        setEmailOccupied(false);
      });
  }

  function handleEmailInput(changeEvent) {
    setUserEmail(changeEvent.target.value);
  }

  function handleUserPassword(changeEvent) {
    let updatedUserPassword = changeEvent.target.value;
    setUserPassword(updatedUserPassword);
  }

  function handleUserPasswordConfirm(changeEvent) {
    let confirmedPasswordInput = changeEvent.target.value;
    if (userPassword !== confirmedPasswordInput) setPasswordConfirmed(false);
    else {
      setUserConfirmedPassword(confirmedPasswordInput);
      setPasswordConfirmed(true);
    }
  }

  async function signup() {
    axios.defaults.withCredentials = true;

    // CSRF COOKIE
    await axios.get(hostName + '/sanctum/csrf-cookie').then(
      async () => {
        // SIGNUP / REGISTER
        await axios
          .post(hostName + '/api/register', {
            name: userNameInput,
            email: userEmail,
            password: userPassword,
            password_confirmation: userConfirmedPassword,
          })
          .then(
            async () => {
              // GET USER
              await axios.get(hostName + '/api/user').then(
                response => {
                  setCurrentUser({
                    id: response.data.id,
                    name: response.data.name,
                    avatarPath: response.data.avatarPath,
                  });

                  setErrorMessage('');
                  setAuthStatus(LOGGED_IN);
                },
                // GET USER ERROR
                () => {
                  setErrorMessage('An internal error occurred');
                },
              );
            },
            // SIGNUP ERROR
            error => {
              if (error.response.data.errors.name) {
                setErrorMessage(error.response.data.errors.name[0]);
              } else if (error.response.data.errors.email) {
                setErrorMessage(error.response.data.errors.email[0]);
              } else if (error.response.data.errors.password) {
                setErrorMessage(error.response.data.errors.password[0]);
              } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
              } else {
                setErrorMessage('Could not complete the sign up');
              }
            },
          );
      },
      // COOKIE ERROR
      () => {
        setErrorMessage('There is a cookie error');
      },
    );
  }

  async function login() {
    axios.defaults.withCredentials = true;
    await axios.get(hostName + '/sanctum/csrf-cookie').then(
      async () => {
        // LOGIN
        await axios
          .post(hostName + '/api/login', {
            email: userEmail,
            password: userPassword,
          })
          .then(
            async () => {
              await axios.get(hostName + '/api/user').then(
                response => {
                  setCurrentUser({
                    id: response.data.id,
                    name: response.data.name,
                    avatarPath: response.data.avatarPath,
                  });
                  // avatarPath to be dealt with
                  setErrorMessage('');
                  setAuthStatus(LOGGED_IN);
                },
                () => {
                  setErrorMessage('Could not complete the login');
                },
              );
            },

            // LOGIN ERROR
            error => {
              if (error.response) {
                setErrorMessage(error.response.data.message);
              } else {
                setErrorMessage('Could not complete the login');
              }
            },
          );
      },

      // COOKIE ERROR
      () => {
        setErrorMessage('Could not complete the login');
      },
    );
  }

  async function logout() {
    axios.defaults.withCredentials = true;
    await axios.get(hostName + '/api/logout');
    setUserNameInput('');
    setUserEmail('');
    setUserPassword('');
    setCurrentUser(null);
    setAuthStatus(NOT_LOGGED_IN);
  }

  const getAuthStatus = () => {
    axios.get(hostName + '/api/user').then(
      () => LOGGED_IN,
      () => NOT_LOGGED_IN,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        getAuthStatus,
        authStatus,
        changeAuthStatusLogin,
        changeAuthStatusSignup,
        userNameInput,
        userEmail,
        currentUser,
        handleUserNameInput,
        handleEmailInput,
        checkEmailOccupied,
        handleUserPassword,
        signup,
        login,
        logout,
        errorMessage,
        emailOccupied,
        passwordConfirmed,
        handleUserPasswordConfirm,
      }}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
      {loading && (
        <PageLoading message='Wait a sec, TripTime is trying to recognise you :)' />
      )}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
