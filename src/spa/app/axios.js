/** @format */

import axios from 'axios';

/**
 * Creates an instance of axios pre-configured with settings
 * to interact with backend SPA authentication system
 * @returns {axios}
 */
export default axios.create({
  baseURL: `${process.env.API_HOSTNAME}/api`,
  withCredentials: true,
  responseType: 'json',
});
