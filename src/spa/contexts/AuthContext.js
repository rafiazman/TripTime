/** @format */

import React, { useState, useEffect } from 'react';
import axios from '../app/axios';
import PageLoading from '../components/PageLoading';

const AuthContext = React.createContext(undefined, undefined);
const AuthProvider = props => {
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userNameInput, setUserNameInput] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailOccupied, setEmailOccupied] = useState(false);
  const [nameOccupied, setNameOccupied] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(true);
  const [userConfirmedPassword, setUserConfirmedPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState('/');

  useEffect(() => {
    if (!currentUser) {
      loadCurrentAuthStatus();
    }
  }, []);

  function setAnchor(link) {
    setRedirectTo(link);
  }

  function loadCurrentAuthStatus() {
    setLoading(true);
    axios
      .get('/user')
      .then(
        response => {
          setCurrentUser({
            id: response.data.id,
            name: response.data.name,
            avatarPath: response.data.avatarPath,
          });
          setErrorMessage('');
          // setAuthStatus(LOGGED_IN);
        },
        () => {
          setCurrentUser(null);
          // setAuthStatus(NOT_LOGGED_IN);
        },
      )
      .then(() => {
        setLoading(false);
      });
  }

  function handleUserNameInput(changeEvent) {
    let updatedUserName = changeEvent.target.value;
    setUserNameInput(updatedUserName);
  }

  function checkNameOccupied(name) {
    axios
      .head(`/user/name/${name}`)
      .then(() => {
        setNameOccupied(true);
      })
      .catch(() => {
        setNameOccupied(false);
      });
  }

  function checkEmailOccupied(email) {
    axios
      .head(`/user/email/${email}`)
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
    // CSRF COOKIE
    await axios.get('/csrf-cookie').then(
      async () => {
        // SIGNUP / REGISTER
        await axios
          .post('/register', {
            name: userNameInput,
            email: userEmail,
            password: userPassword,
            password_confirmation: userConfirmedPassword,
          })
          .then(
            async () => {
              // GET USER
              await axios.get('/user').then(
                response => {
                  setCurrentUser({
                    id: response.data.id,
                    name: response.data.name,
                    avatarPath: response.data.avatarPath,
                  });

                  setErrorMessage('');
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
    await axios.get('/csrf-cookie').then(
      async () => {
        // LOGIN
        await axios
          .post('/login', {
            email: userEmail,
            password: userPassword,
          })
          .then(
            async () => {
              await axios.get('/user').then(
                response => {
                  setCurrentUser({
                    id: response.data.id,
                    name: response.data.name,
                    avatarPath: response.data.avatarPath,
                  });
                  setErrorMessage('');
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
    await axios.get('/logout');
    setUserNameInput('');
    setUserEmail('');
    setUserPassword('');
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        userNameInput,
        userEmail,
        currentUser,
        handleUserNameInput,
        handleEmailInput,
        checkEmailOccupied,
        checkNameOccupied,
        handleUserPassword,
        signup,
        login,
        logout,
        errorMessage,
        emailOccupied,
        nameOccupied,
        passwordConfirmed,
        handleUserPasswordConfirm,
        setAnchor,
        redirectTo,
      }}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
      {loading && (
        <PageLoading message='Wait a sec, TripTime is trying to recognise you 🙂' />
      )}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
