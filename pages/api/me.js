/** @format */

import auth0 from '../../app/auth0';

export default async function me(req, res) {
  try {
    await auth0.handleProfile(req, res, {});
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
