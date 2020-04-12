/** @format */

import { initAuth0 } from '@auth0/nextjs-auth0';
import url from 'url';

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: `openid profile`,
  redirectUri: url.resolve(process.env.APP_HOSTNAME, `/api/callback`),
  postLogoutRedirectUri: process.env.APP_HOSTNAME,
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 24,
  },
});
