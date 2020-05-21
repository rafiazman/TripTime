/** @format */

import TestRenderer from 'react-test-renderer';
import React from 'react';
import Dashboard from '../../../components/dashboard/Dashboard';
import TripList from '../../../components/dashboard/TripList';
import axios from 'axios';

describe('Test Dashboard Loading', () => {
  const DATE_TO_USE = new Date(2020, 11, 17, 23, 24, 0);
  const _Date = Date;
  global.Date = jest.fn(() => DATE_TO_USE);
  global.Date.UTC = _Date.UTC;
  global.Date.parse = _Date.parse;
  global.Date.now = _Date.now;
  axios.get.mockResolvedValue({ data: [] });
  const userHomePageRenderer = TestRenderer.create(
    <Dashboard name={'Tester'} />,
  );
  test('Check if Dashboard renders three TripList', () => {
    expect(userHomePageRenderer.root.findAllByType(TripList).length).toBe(3);
  });
  test('Check if Dashboard displays three loading bars when the trips are loading', () => {
    userHomePageRenderer.root.instance.setState({
      currentLoading: true,
      pastLoading: true,
      planningLoading: true,
    });
    expect(userHomePageRenderer.toJSON()).toMatchSnapshot();
  });
});
