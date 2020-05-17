/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const TripContext = React.createContext(undefined, undefined);

const TripProvider = props => {
  const [trip, setTrip] = useState(undefined);
  const [activities, setActivities] = useState([]);
  const [travels, setTravels] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [travelsLoading, setTravelsLoading] = useState(true);
  const [tripLoading, setTripLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    loadTrip();
  }, []);

  function loadTrip() {
    const tripID = router.query.id;
    const hostName = process.env.API_HOSTNAME;
    axios.defaults.withCredentials = true;
    // TODO: Implement API for getting "preview" of a trip for non-members
    axios
      .get(`${hostName}/api/trip/${tripID}`)
      .then(
        res => setTrip(res.data),
        err =>
          setErrorStatus(
            err.response && err.response.status ? err.response.status : 500,
          ),
      )
      .then(() => {
        setTripLoading(false);
      });
    axios
      .get(`${hostName}/api/trip/${tripID}/activities`)
      .then(
        res => setActivities(res.data),
        err =>
          setErrorStatus(
            err.response && err.response.status ? err.response.status : 500,
          ),
      )
      .then(() => {
        setActivitiesLoading(false);
      });
    axios
      .get(`${hostName}/api/trip/${tripID}/travels`)
      .then(
        res => setTravels(res.data),
        err =>
          setErrorStatus(
            err.response && err.response.status ? err.response.status : 500,
          ),
      )
      .then(() => {
        setTravelsLoading(false);
      });
  }

  function handleActivityEdit(updatedActivity) {
    setActivities(
      activities.map(activity =>
        updatedActivity.id === activity.id ? updatedActivity : activity,
      ),
    );
  }

  return (
    <TripContext.Provider
      value={{
        activities,
        activitiesLoading,
        handleActivityEdit,

        travels,
        travelsLoading,

        trip,
        tripLoading,

        errorStatus,
        setErrorStatus,
      }}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </TripContext.Provider>
  );
};

export { TripProvider, TripContext };
