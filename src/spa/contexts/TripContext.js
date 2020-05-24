/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ErrorDialog from '../components/dialog/ErrorDialog';

const TripContext = React.createContext(undefined, undefined);
const ACTIVITY = 'activity';
const TRAVEL = 'travel';

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
    if (!tripID) return;
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

  async function updateOneTravel(travelPatch, travelID) {
    const tripID = router.query.id;
    await axios
      .patch(`${hostName}/api/trip/${tripID}/travels`, {
        id: travelID,
        ...travelPatch,
      })
      .then(res => setOneEvent(TRAVEL, travelID, res.data.travel))
      .catch(err => {
        setDialogError({
          title: 'Travel Update Failed',
          message: `Sorry, we failed to update the travel ${
            travelPatch.name
          } because: ${
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : 'An internal error happened'
          }`,
        });
        setDialogErrorDisplay(true);
      });
  }

  async function updateOneActivity(activityPatch, activityID) {
    const tripID = router.query.id;
    await axios
      .patch(`${hostName}/api/trip/${tripID}/activities`, {
        id: activityID,
        ...activityPatch,
      })
      .then(res => setOneEvent(ACTIVITY, activityID, res.data.activity))
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

  async function handleJoin(eventType, eventID) {
    await axios.post(`${hostName}/api/${eventType}/${eventID}/join`).then(
      res =>
        setOneEvent(
          eventType,
          eventID,
          eventType === ACTIVITY ? res.data.activity : res.data.travel,
        ),
      err => {
        setDialogError({
          title: 'Activity Join Failed',
          message: `Sorry, we failed to join you in the ${eventType} because: ${
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : 'An internal error happened'
          }`,
        });
        setDialogErrorDisplay(true);
      },
    );
  }

  async function deleteOneTravel(travelID) {
    await axios
      .delete(`${hostName}/api/travel/${travelID}`)
      .then(() =>
        setTravels(travels => travels.filter(travel => travel.id !== travelID)),
      )
      .catch(err => {
        setDialogError({
          title: 'Travel Delete Failed',
          message: `Sorry, we failed to delete the travel
         because: ${
           err.response && err.response.data && err.response.data.message
             ? err.response.data.message
             : 'An internal error happened'
         }`,
        });
        setDialogErrorDisplay(true);
      });
  }

  async function deleteOneActivity(activityID) {
    await axios
      .delete(`${hostName}/api/activity/${activityID}`)
      .then(() =>
        setActivities(activities =>
          activities.filter(activity => activity.id !== activityID),
        ),
      )
      .catch(err => {
        setDialogError({
          title: 'Activity Delete Failed',
          message: `Sorry, we failed to delete the activity
         because: ${
           err.response && err.response.data && err.response.data.message
             ? err.response.data.message
             : 'An internal error happened'
         }`,
        });
        setDialogErrorDisplay(true);
      });
  }

  function setOneEvent(eventType, eventID, newEvent) {
    if (eventType === ACTIVITY)
      setActivities(activities =>
        activities.map(activity =>
          eventID === activity.id ? newEvent : activity,
        ),
      );
    if (eventType === TRAVEL)
      setTravels(travels =>
        travels.map(travel => (eventID === travel.id ? newEvent : travel)),
      );
  }

  return (
    <TripContext.Provider
      value={{
        activities,
        activitiesLoading,
        updateOneActivity,
        deleteOneActivity,

        travels,
        travelsLoading,
        updateOneTravel,
        deleteOneTravel,

        handleJoin,

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
