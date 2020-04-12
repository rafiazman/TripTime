/** @format */

import auth0 from '../../app/auth0';

async function logout(req, res) {
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
}

export default logout;
