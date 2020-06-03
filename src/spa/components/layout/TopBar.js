/** @format */
import React from 'react';
import Link from 'next/link';
import styles from '../../css/topbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/AuthContext';
import PageLoading from '../PageLoading';
import withRouter from 'next/dist/client/with-router';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fold: true, loggingOut: false };
  }

  generateOptions(isLoggedIn, logoutHandler) {
    if (isLoggedIn)
      return [
        <Link href='/' key={0}>
          <a>My Trips</a>
        </Link>,
        <Link href='/newtrip' key={1}>
          <a>New Trip</a>
        </Link>,
        <span
          className='pretend-link'
          key={2}
          onClick={async () => {
            this.setState(() => ({ loggingOut: true }));
            await logoutHandler();
            this.setState(() => ({ loggingOut: false }));
            // eslint-disable-next-line react/prop-types
            this.props.router.push('/');
          }}
        >
          Log out
        </span>,
      ];
    else
      return [
        <Link href='/signup' key={0}>
          <a>Sign Up</a>
        </Link>,
        <Link href='/login' key={1}>
          <a>Log In</a>
        </Link>,
      ];
  }

  render() {
    return (
      <>
        {this.state.loggingOut && (
          <PageLoading message='TripTime is logging you out. See you soon 🙂' />
        )}
        <AuthContext.Consumer>
          {({ currentUser, logout }) => (
            <header className={styles.bar}>
              <span className='logo-span'>
                <Link href={'/'}>
                  <a>
                    <img src='/img/logo.svg' alt='' />
                    <span className={styles.triptime}>TripTime</span>
                  </a>
                </Link>
              </span>
              <span className={styles.options}>
                {currentUser && (
                  <Link href='/'>
                    <a>
                      <img
                        src={currentUser.avatarPath}
                        className={styles.avatar}
                        alt={''}
                      />
                    </a>
                  </Link>
                )}
                <span
                  className={this.state.fold ? styles.fold : styles.activeFold}
                  onClick={() => {
                    this.clickBurger();
                  }}
                >
                  <FontAwesomeIcon icon={faBars} />
                </span>
                {!this.state.fold && (
                  <div className={styles.dropBox}>
                    {this.generateOptions(currentUser, logout).map(
                      (option, index) => {
                        return (
                          <div key={index} className={styles.dropOption}>
                            {' '}
                            {option}
                          </div>
                        );
                      },
                    )}
                  </div>
                )}
                <span className={styles.full}>
                  {this.generateOptions(currentUser, logout).map(
                    (option, index) => {
                      return <span key={index}>{option}</span>;
                    },
                  )}
                </span>
              </span>
            </header>
          )}
        </AuthContext.Consumer>
      </>
    );
  }

  componentDidMount() {
    this.setState(() => ({ fold: true }));
  }

  clickBurger() {
    this.setState(state => ({ fold: !state.fold }));
  }
}
export default withRouter(TopBar);
