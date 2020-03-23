/** @format */

import http from 'http';
import axios from 'axios';
import listen from 'test-listen';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import handler from '../../../pages/api/users';

describe('/api/users handler', () => {
  it('responds 405 Method Not Allowed to GET requests', async () => {
    expect.assertions(1);
    let requestHandler = (req, res) => {
      return apiResolver(req, res, undefined, handler, undefined);
    };
    let server = http.createServer(requestHandler);
    let url = await listen(server);

    let response = await axios.get(url);

    expect(response.status).toBe(405);
    return server.close();
  });
});
