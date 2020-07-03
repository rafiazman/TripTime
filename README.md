<h1 align="center">
    <a href="https://trip-time-develop.herokuapp.com">
        <img src="/docs/bw_logo_github.png" alt="TripTime" width="200">
    </a>
    <br>
    TripTime
    <br>
</h1>

<h4 align="center">Live, real-time collaboration brought to an online map interface.</h4>
<h4 align="center">03/07/2020 UPDATE: This repo has now been moved into two separate repositories. 
    <br>https://github.com/tantigers/triptime-web <br>https://github.com/tantigers/triptime-api</h4>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#usage">Usage</a> •
  <a href="#testing">Testing</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#contributors">Contributors</a>
</p>

TripTime is an application for groups of friends to plan a trip together. Users will be able to collaborate in real-time plotting activities over a geographical map interface.

* Plan trips with points of interests and activities for each one.
* Collaborate with friends in planning your journey through live chat.
* Get an overview of your planned trip from Day 1 to Finish!

### Build Status

| Branch  | Build Status |
|---------|--------------|
| master  | <img src="https://travis-ci.org/tantigers/TripTime.svg?branch=master" alt="master build status"> |
| develop | <img src="https://travis-ci.org/tantigers/TripTime.svg?branch=develop" alt="develop build status"> |

### GitHub Pages (for COMPSCI 732)
The GitHub Pages for this project with team project meeting minutes, task breakdown and assignment 
can be found [here](https://tantigers.github.io/TripTime).

## Quick Start
In order to run the project, you will need to ensure that you have the following installed on your machine:
 - [Docker](https://www.docker.com/)
 - docker-compose (installed by default with Docker on Windows)
 - npm (installed with Node.js on Windows)

From the project root directory, execute the following commands:
```shell script
$ npm run prod
$ npm run migrate
```

After running these commands, open http://localhost in a web browser and register an account.

When finished, terminate the Docker containers with:
```shell script
$ npm run prod:stop
```

## Testing
To run tests for the project, run these commands from the root directory of the project. Ensure that the production/development server is currently running before execution.
```shell script
$ npm run test
```

### End-to-end
For end-to-end tests we have used [Cypress](https://www.cypress.io/). These tests can be executed through the following command:
```shell script
$ npm run test:e2e
```

## Usage

### Development
To run the web application with hot module reload and have the application served at http://localhost:3000
```shell script
# Start dev server
$ npm run dev

# Terminate dev server
$ npm run dev:stop 
```

### Production
To run the web application in production and have the application served at http://localhost
```shell script
# Start prod server
$ npm run prod

# Terminate prod server
$ npm run prod:stop
```

### Laravel
The containerised MySQL server can be accessed at `127.0.0.1:4306` using any client of choice.

To run `composer` commands within the container
```shell script
$ docker-compose exec php composer
```

To run `artisan` commands within the container
```shell script
$ docker-compose exec php php artisan
```

## Screenshots
&ensp;

<p align="center">
  <img src="/docs/map-screenshot.png?raw=true" width="800" alt="TripTime Map">
</p>

## Contributors
Thank you to the contributors below who have helped advance this project.

[![](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/images/0)](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/links/0)[![](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/images/1)](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/links/1)[![](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/images/2)](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/links/2)[![](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/images/3)](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/links/3)[![](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/images/4)](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/links/4)[![](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/images/5)](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/links/5)[![](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/images/6)](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/links/6)[![](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/images/7)](https://sourcerer.io/fame/rafiazman/tantigers/TripTime/links/7)
