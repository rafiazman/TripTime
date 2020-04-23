/** @format */

import TestRenderer from 'react-test-renderer';
import React from 'react';
import Dashboard from '../../../components/dashboard/Dashboard';
import TripList from '../../../components/dashboard/TripList';

describe('Test Dashboard', () => {
  const userHomePageRenderer = TestRenderer.create(
    <Dashboard name={'Tester'} />,
  );
  test('Check if Dashboard renders three TripList', () => {
    expect(userHomePageRenderer.root.findAllByType(TripList).length).toBe(3);
  });
  test('Check if Dashboard matches Snapshot', () => {
    expect(userHomePageRenderer.toJSON()).toMatchSnapshot();
  });
});
