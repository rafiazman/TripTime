/** @format */
import TestRenderer from 'react-test-renderer';
import TripSummary from '../../../components/timeline/TripSummary';
import React from 'react';
import axios from 'axios';

describe('asks the user to login before showing the trip summary', () => {
  const errResp = {
    status: 401,
    response: { message: 'mocking unauthorised response' },
  };
  axios.get.mockImplementation(() => Promise.reject(errResp));
  const notLogInRenderer = TestRenderer.create(
    <TripSummary setAnchor={() => {}} />,
  );

  const notLogInInstance = notLogInRenderer.root;

  test('Render link to log in', () => {
    const links = notLogInInstance.findAllByProps({ href: '/login' });
    expect(links.length).toBe(2);
  });
});
