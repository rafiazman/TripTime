/** @format */

import React from 'react';
import { TripProvider } from '../../contexts/TripContext';
import axios from 'axios';
import renderer, { act } from 'react-test-renderer';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: { id: '1' },
      asPath: '',
    };
  },
}));

let tripID;
let hostName;
describe('TripContext', () => {
  beforeEach(() => {
    hostName = process.env.API_HOSTNAME;
    tripID = '1';
  });

  it('TripProvider should fetch the trip, activities and travels based on current trip id upon mounting', async () => {
    const axiosGetSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: { undefined } });
    await act(async () => {
      renderer.create(<TripProvider />);
    });
    expect(axiosGetSpy).toBeCalledWith(
      `${hostName}/api/trip/${tripID}/activities`,
    );
    expect(axiosGetSpy).toBeCalledWith(
      `${hostName}/api/trip/${tripID}/travels`,
    );
    expect(axiosGetSpy).toBeCalledWith(`${hostName}/api/trip/${tripID}`);
    axiosGetSpy.mockRestore();
  });
});
