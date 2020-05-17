/** @format */

import TestRenderer from 'react-test-renderer';
import React from 'react';
import Dashboard from '../../../components/dashboard/Dashboard';
import TripList from '../../../components/dashboard/TripList';
import axios from 'axios';
import myTripInfos from '../../../app/dummy-data/my-trip-infos';
import TripCard from '../../../components/dashboard/TripCard';

describe('Test Dashboard Loaded', () => {
  const DATE_TO_USE = new Date(2020, 11, 17, 23, 24, 0);
  const _Date = Date;
  global.Date = jest.fn(() => DATE_TO_USE);
  global.Date.UTC = _Date.UTC;
  global.Date.parse = _Date.parse;
  global.Date.now = _Date.now;
  axios.get.mockResolvedValue({ data: myTripInfos });
  const userHomePageRenderer = TestRenderer.create(
    <Dashboard name={'Tester'} />,
  );
  test('Check if Dashboard renders three TripList', () => {
    expect(userHomePageRenderer.root.findAllByType(TripList).length).toBe(3);
  });
  test('Check if Dashboard displays TripCards when it is loaded', () => {
    userHomePageRenderer.root.instance.setState({
      currentLoading: false,
      pastLoading: false,
      planningLoading: false,
    });
    expect(userHomePageRenderer.root.findAllByType(TripCard).length).toBe(12);
    expect(userHomePageRenderer.toJSON()).toMatchSnapshot();
  });
});
