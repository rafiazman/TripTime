/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ErrorDialog from '../components/dialog/ErrorDialog';

const TripContext = React.createContext(undefined, undefined);

const TripProvider = props => {
  const [trip, setTrip] = useState(undefined);
  const [activities, setActivities] = useState([]);
  const [travels, setTravels] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [travelsLoading, setTravelsLoading] = useState(true);
  const [tripLoading, setTripLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(undefined);
  const [dialogError, setDialogError] = useState(undefined);
  const [dialogErrorDisplay, setDialogErrorDisplay] = useState(false);
  const router = useRouter();
  const hostName = process.env.API_HOSTNAME;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    loadTrip();
  }, []);

  function loadTrip() {
    const tripID = router.query.id;
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

  async function updateOneActivity(activityPatch, activityId) {
    const tripID = router.query.id;
    await axios
      .patch(`${hostName}/api/trip/${tripID}/activities`, {
        id: activityId,
        ...activityPatch,
      })
      .then(res => {
        setActivities(activities =>
          activities.map(activity =>
            activityId === activity.id ? res.data.activity : activity,
          ),
        );
      })
      .catch(err => {
        setDialogError({
          title: 'Activity Update Failed',
          message: `Sorry, we failed to update the activity ${
            activityPatch.name
          } because: ${
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : 'An internal error happened'
          }`,
        });
        setDialogErrorDisplay(true);
      });
  }

  return (
    <TripContext.Provider
      value={{
        activities,
        activitiesLoading,
        updateOneActivity,

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
      {dialogErrorDisplay && (
        <ErrorDialog
          open={dialogErrorDisplay}
          message={dialogError.message}
          title={dialogError.title}
          onClose={() => {
            setDialogError(undefined);
            setDialogErrorDisplay(false);
          }}
        />
      )}
    </TripContext.Provider>
  );
};

export { TripProvider, TripContext };
