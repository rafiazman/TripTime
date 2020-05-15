/** @format */

import React, { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../css/new-trip.module.css';
import { DebounceInput } from 'react-debounce-input';
import Link from 'next/link';
import DayRangeInput from '../components/form/DayRangeInput';
import axios from 'axios';
import { useRouter } from 'next/router';
import PageLoading from '../components/PageLoading';

export default function NewTrip() {
  const [tripName, setTripName] = useState('');
  const [tripDescription, setTripDescription] = useState('');
  const [from, setFrom] = useState(undefined);
  const [to, setTo] = useState(undefined);
  const [tripCreating, setTripCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const router = useRouter();

  const submitRequest = () => {
    setTripCreating(true);
    const hostName = process.env.API_HOSTNAME;
    axios.defaults.withCredentials = true;
    axios
      .post(`${hostName}/api/trips`, {
        name: tripName,
        description: tripDescription,
        start: from,
        end: to,
      })
      .then(res => {
        router.push(`/trip/${res.data.trip.id}`);
      })
      .catch(error => {
        setTripCreating(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      {tripCreating && (
        <PageLoading message={'TripTime is creating the trip for you:)'} />
      )}
      <AuthContext.Consumer>
        {({ currentUser, setAnchor }) => {
          if (!currentUser)
            return (
              <div className={'fit-center'}>
                <Link href={'/login'}>
                  <a onClick={() => setAnchor('/newtrip')}> Log in </a>
                </Link>
                to create your trip
              </div>
            );
          else
            return (
              <div className={styles.newTripContainer}>
                {errorMessage ? (
                  <div className='failed'>
                    <p>Sorry, we failed to create a trip for you because:</p>
                    <p>{errorMessage}</p>
                    <p>Please try again:</p>
                  </div>
                ) : (
                  <h1 className='form-title'>
                    <img src='/img/logo.svg' className={styles.logo} alt='' />
                    Ready for your next adventure?
                  </h1>
                )}
                <form
                  className={styles.newTripForm}
                  onSubmit={e => {
                    submitRequest();
                    e.preventDefault();
                  }}
                >
                  <label>
                    Name your trip
                    <DebounceInput
                      type='text'
                      name='trip-name'
                      required={true}
                      debounceTimeout={200}
                      onChange={event => {
                        setTripName(event.target.value);
                      }}
                      value={tripName}
                      maxLength={25}
                    />
                  </label>
                  <label>
                    Give your trip a short description
                    <DebounceInput
                      element='textarea'
                      name='trip-description'
                      required={true}
                      debounceTimeout={200}
                      onChange={event => {
                        setTripDescription(event.target.value);
                      }}
                      value={tripDescription}
                      cols={28}
                      rows={3}
                      maxLength={128}
                    />
                  </label>
                  <label>When do you plan to go? </label>
                  <DayRangeInput
                    fromChanged={from => {
                      setFrom(from);
                    }}
                    toChanged={to => {
                      setTo(to);
                    }}
                    required={true}
                  />

                  <button type={'submit'}>Create Trip</button>
                </form>
              </div>
            );
        }}
      </AuthContext.Consumer>
    </>
  );
}
