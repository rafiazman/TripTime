/** @format */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../contexts/AuthContext';
import styles from '../../../css/join.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import PageLoading from '../../../components/PageLoading';

export default function JoinTripIndex({ uuid }) {
  return (
    <AuthContext.Consumer>
      {({ currentUser, setAnchor }) => {
        if (currentUser) return <JoinTrip uuid={uuid} />;
        else
          return (
            <div className={styles.authPrompt}>
              <h1 className='form-title'>
                <img src='/img/logo.svg' alt='' />
                Welcome to TripTime!
              </h1>
              Please{' '}
              <Link href={'/login'}>
                <a onClick={() => setAnchor(`/join/${uuid}`)}> log in</a>
              </Link>{' '}
              or{' '}
              <Link href={'/signup'}>
                <a onClick={() => setAnchor(`/join/${uuid}`)}> sign up</a>
              </Link>{' '}
              to accept the invitation.
            </div>
          );
      }}
    </AuthContext.Consumer>
  );
}

function JoinTrip({ uuid }) {
  const hostName = process.env.API_HOSTNAME;
  const [isProcessing, setIsProcessing] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [targetName, setTargetName] = useState(undefined);
  const [error, setError] = useState(undefined);
  const router = useRouter();
  useEffect(function() {
    if (uuid) {
      axios
        .post(`${hostName}/api/join/${uuid}`)
        .then(res => {
          setTargetName(res.data.trip.name);
          setIsProcessing(false);
          setIsRedirecting(true);
          setTimeout(() => {
            router
              .push(`/trip/${res.data.trip.id}`)
              .then(() => setIsRedirecting(false));
          }, 2000);
        })
        .catch(err => {
          setError(err.response.data.message);
          setIsProcessing(false);
        });
    } else {
      setError('invalid invitation link');
      setIsProcessing(false);
    }
  }, []);

  if (isProcessing)
    return (
      <PageLoading
        message={'Welcome! We are processing your invitation link'}
      />
    );
  else if (error)
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '4rem',
        }}
      >
        <div className={'failed'}>
          <p className={'form-title'}>
            <img src='/img/logo.svg' alt='' />
            Sorry, we failed to process the invitation because:
          </p>
          <p>{error}</p>
        </div>
      </div>
    );
  else if (isRedirecting)
    return (
      <PageLoading
        message={`Great! We are now redirecting you to trip: ${targetName}`}
      />
    );
  else {
    return <div />;
  }
}

JoinTripIndex.propTypes = {
  uuid: PropTypes.string.isRequired,
};

JoinTrip.propTypes = {
  uuid: PropTypes.string.isRequired,
};
JoinTripIndex.getInitialProps = ({ query }) => {
  return { uuid: query.uuid };
};
