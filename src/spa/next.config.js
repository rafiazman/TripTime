require('dotenv').config();

// Get a collection of all variables that were defined in process.env and in the
// .env file, except for disallowed variables.
// See https://err.sh/zeit/next.js/env-key-not-allowed for more details.
function getAllAllowedEnvironmentVariables() {
  return Object.entries(process.env).reduce(
    (vars, [name, value]) =>
      /^(?:__|NODE_)/.test(name) ? vars : { ...vars, [name]: value },
    {},
  )
}

module.exports = {
  env: {
    // Make all variables that were defined in process.env and the .env file available at build time.
    ...getAllAllowedEnvironmentVariables(),

    // Reference a specific variable that was defined in process.env or the .env file.
    TEST: process.env.TEST,
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(jpg|png)$/,
      use: [
       { loader: 'file-loader' },
       { loader: 'url-loader',
         options: {
           limit: 100000,
           name: '[name].[ext]'
         }
       }
     ]})
  return config;
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}
