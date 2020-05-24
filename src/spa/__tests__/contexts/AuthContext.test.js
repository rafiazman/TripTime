/** @format */

import React from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import axios from '../../app/axios';
import renderer, { act } from 'react-test-renderer';

describe('AuthContext', () => {
  it('AuthProvider should fetch the current user upon mounting', async () => {
    const axiosGetSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: { undefined } });
    await act(async () => {
      renderer.create(<AuthProvider />);
    });
    expect(axiosGetSpy).toBeCalledWith(`/user`);
    axiosGetSpy.mockRestore();
  });
});
