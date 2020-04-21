/** @format */

import TestRenderer from 'react-test-renderer';
import React from 'react';
import UserHomePage from '../../../components/homepage/UserHomePage';
import TripList from '../../../components/homepage/TripList';

describe('Test UserHomePage', () => {
  const userHomePageRenderer = TestRenderer.create(
    <UserHomePage name={'Tester'} />,
  );
  test('Check if UserHomePage renders three TripList', () => {
    expect(userHomePageRenderer.root.findAllByType(TripList).length).toBe(3);
  });
  test('Check if UserHomePage matches Snapshot', () => {
    expect(userHomePageRenderer.toJSON()).toMatchSnapshot();
  });
});
