/** @format */
import React from 'react';
import withLayout from '../components/Layout';

function Index() {
  return (
    <div>
      <p>Hello Next.js
          Deployed via heroku and travis success</p>
    </div>
  );
}

export default withLayout(Index);
