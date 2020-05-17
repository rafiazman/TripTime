/** @format */

import React from 'react';
import styles from '../css/error.module.css';
import Link from 'next/link';
import PropTypes from 'prop-types';

const photoCredits = {
  500: 'Photo by Kote Puerto on Unsplash',
  401: 'Photo by Cong H on Unsplash',
  404: 'Photo by Ricky Kharawala on Unsplash',
  400: 'Photo by Roberto Nickson on Unsplash',
};
export default function TripError({ status }) {
  const imageCode = status
    ? [400, 401, 404, 500].includes(status)
      ? status
      : status < 500
      ? 400
      : 500
    : 500;
  return (
    <div className={styles.errorContainer}>
      <img
        src={`/img/cute-errors/${imageCode}.jpg`}
        alt={''}
        className={styles.photo}
      />
      <div className={styles.credit}>{photoCredits[imageCode]}</div>
      <div className={styles.messageContainer}>
        <h1>Error: {status}</h1>
        <h1>Sorry we did not bring what you want...</h1>
        {status === 401 && (
          <>
            Looks like you do not have access to this page. Please:
            <ui>
              <li>
                {' '}
                <Link href={'/login'}>
                  <a>Log in </a>
                </Link>
                if you have not.
              </li>
              <li>
                Contact a trip member to invite you if you are not a member of
                this trip yet
              </li>
            </ui>
          </>
        )}
        {status !== 401 && status < 500 && (
          <p>
            Come back to
            <Link href={'/'}>
              <a> homepage </a>
            </Link>
            to find out about something else?
          </p>
        )}
        {status >= 500 && (
          <div>
            <p>
              We would appreciate it if you could let us know about this server
              error through{' '}
              <a
                href={
                  'https://github.com/tantigers/TripTime/issues/new?template=bug_report.md&title=ServerError'
                }
              >
                GitHub
              </a>{' '}
              issues.
            </p>
            <p>
              In the meantime, back to{' '}
              <Link href={'/'}>
                <a>homepage</a>
              </Link>{' '}
              to find out about something else?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

TripError.propTypes = {
  status: PropTypes.number,
};
