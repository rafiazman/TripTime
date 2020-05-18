/** @format */

import React, { useState } from 'react';
import Tooltip from '../Tooltip';
import { TripContext } from '../../contexts/TripContext';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

export default function JoinButton({ eventType, eventID }) {
  const [isJoining, setIsJoining] = useState(false);
  const clickJoin = handleJoin => {
    setIsJoining(() => true);
    handleJoin(eventType, eventID).then(() => setIsJoining(() => false));
  };
  return isJoining ? (
    <Joining />
  ) : (
    <TripContext.Consumer>
      {({ handleJoin }) => (
        <Tooltip
          text={`Click to join the ${eventType}`}
          component={
            <button
              onClick={() => clickJoin(handleJoin)}
              className={'people-button'}
            >
              Join
            </button>
          }
        />
      )}
    </TripContext.Consumer>
  );
}

JoinButton.propTypes = {
  eventType: PropTypes.string.isRequired,
  eventID: PropTypes.number.isRequired,
};

function Joining() {
  return (
    <span className={'people-button-loading'}>
      <ReactLoading type='spin' color='#fff' width='1.5rem' height={'1.5rem'} />
    </span>
  );
}
