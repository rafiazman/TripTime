/** @format */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from '../../css/topbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, fold: true };
  }

  componentDidMount() {
    this.props.setUser(this);
  }

  generateOptions(isLoggedIn) {
    if (isLoggedIn)
      return [
        { name: 'My Trips', target: '/' },
        { name: 'New Trip', target: '/' },
        { name: 'Log Out', target: 'api/logout' },
      ];
    else
      return [
        { name: 'Sign Up', target: '/' },
        { name: 'Log In', target: 'api/login' },
      ];
  }

  render() {
    return (
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
          {this.state.user && (
            <Link href='profile'>
              <a>
                <img
                  src={this.state.user.picture}
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
              {this.generateOptions(this.state.user).map((option, index) => {
                return (
                  <div className={styles.dropOption} key={index}>
                    <Link href={option.target} key={index}>
                      <a>{option.name}</a>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
          <span className={styles.full}>
            {this.generateOptions(this.state.user).map((option, index) => {
              return (
                <Link href={option.target} key={index}>
                  <a>{option.name}</a>
                </Link>
              );
            })}
          </span>
        </span>
      </header>
    );
  }

  clickBurger() {
    this.setState(state => ({ fold: !state.fold }));
  }
}

TopBar.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};
