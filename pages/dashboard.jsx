/** @format */
import React from 'react';
import withLayout from '../components/Layout';
import TripSummary from '../components/TripSummary';
import trip from '../dummy-data/trip';

function Dashboard() {
  return <TripSummary trip={trip} />;
}

export default withLayout(Dashboard);
