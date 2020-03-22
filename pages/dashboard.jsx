/** @format */
import React from 'react';
import withLayout from '../components/Layout';

function Dashboard() {
  return (
    <div>
      <p>This is the summary of the trip</p>
    </div>
  );
}

export default withLayout(Dashboard);
