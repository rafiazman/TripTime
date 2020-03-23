/** @format */

import http from 'http';
import fetch from 'isomorphic-unfetch';
import listen from 'test-listen';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import handler from '../../../pages/api/users';
import mongoose from 'mongoose';

describe('/api/users handler', () => {
  let server;
  let url;

  beforeAll(async done => {
    server = http.createServer((req, res) => apiResolver(req, res, undefined, handler, undefined));
    url = await listen(server);
    done();
  });

  afterAll(done => {
    mongoose.connection.close();
    server.close(done);
  });

  it('responds 405 Method Not Allowed to GET requests', async () => {
    const response = await fetch(url);

    expect(response.status).toBe(405);
  });
});
