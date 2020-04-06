/** @format */

import auth0 from '../../app/auth0';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/profile' });
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
}
