/** @format */

import TestRenderer from 'react-test-renderer';
import React from 'react';
import TripList from '../../../components/dashboard/TripList';
import TripCard from '../../../components/dashboard/TripCard';
import myTripInfos from '../../../app/dummy-data/my-trip-infos';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const testNoTripDisplay = (
  <h3 className={'no-display'}>
    This should be displayed when there is no trip
  </h3>
);

describe('Test TripList renders correctly when given no trip', () => {
  const noTripRenderer = TestRenderer.create(
    <TripList
      displayIfNoTrip={testNoTripDisplay}
      icon={faCode}
      tripInfoList={[]}
      title={'Test Trip List'}
      loading={false}
    />,
  );
  const noTripInstance = noTripRenderer.root;

  test('TripList renders no TripCard if given no trip', () => {
    expect(noTripInstance.findAllByType(TripCard).length).toBe(0);
  });
  test('TripList renders a message if given no trip', () => {
    expect(
      noTripInstance.findByProps({ className: 'no-display' }).innerHTML,
    ).toEqual(testNoTripDisplay.innerHTML);
  });
  test('Match with Snapshot', () => {
    expect(noTripRenderer.toJSON()).toMatchSnapshot();
  });
});

describe('Test TripList renders correctly when given four trips', () => {
  const fourTripsRenderer = TestRenderer.create(
    <TripList
      displayIfNoTrip={testNoTripDisplay}
      icon={faCode}
      tripInfoList={myTripInfos}
      title={'Test Trip List'}
      loading={false}
    />,
  );
  const fourTripsInstance = fourTripsRenderer.root;

  test('TripList renders four TripCard if given four trips', () => {
    expect(fourTripsInstance.findAllByType(TripCard).length).toBe(4);
  });
  test('TripList does not render a noTripMessage if given four trips', () => {
    expect(
      fourTripsInstance.findAllByProps({ className: 'no-display' }).length,
    ).toBe(0);
  });
  test('Match with Snapshot', () => {
    expect(fourTripsRenderer.toJSON()).toMatchSnapshot();
  });
});
