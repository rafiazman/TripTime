/** @format */

import http from 'http';
import fetch from 'isomorphic-unfetch';
import listen from 'test-listen';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import handler from '../../../pages/api/users';
import mongoose from 'mongoose';
import User from '../../../app/models/User';

describe('/api/users handler', () => {
  let server;
  let url;

  beforeAll(async done => {
    process.env.MONGODB_URI = process.env.MONGODB_TEST_URI;
    server = http.createServer((req, res) =>
      apiResolver(req, res, undefined, handler, undefined),
    );
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

  it('adds a new user to the database when POST request is submitted', async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'abc123',
        name: 'John',
      }),
    });
    const newDocumentCount = await User.countDocuments({}).exec();

    expect(newDocumentCount).toEqual(1);
    expect(response.status).toEqual(201);

    await User.collection.drop();
  });
});
