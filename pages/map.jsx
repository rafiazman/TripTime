/** @format */
import React from 'react';
import withLayout from '../components/Layout';
import activities from "../dummy-data/activities";
import TripMap from "../components/DummyTripMap";

function Map() {
  return (
    <TripMap activities = {activities}/>
  );
}

export default withLayout(Map);
