/** @format */

import React from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import axios from 'axios';
import renderer, { act } from 'react-test-renderer';

let hostName;
describe('AuthContext', () => {
  beforeEach(() => {
    hostName = process.env.API_HOSTNAME;
  });

  it('AuthProvider should fetch the current user upon mounting', async () => {
    const axiosGetSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: { undefined } });
    await act(async () => {
      renderer.create(<AuthProvider />);
    });
    expect(axiosGetSpy).toBeCalledWith(`${hostName}/api/user`);
    axiosGetSpy.mockRestore();
  });
});
