<h1 align="center">
    <a href="https://trip-time-develop.herokuapp.com">
        <img src="/docs/bw_logo_github.png" alt="TripTime" width="200">
    </a>
    <br>
    TripTime
    <br>
</h1>

<h4 align="center">Live, real-time collaboration brought to an online map interface.</h4>

<p align="center">
  <a href="#usage">Usage</a> •
  <a href="#screenshots">Screenshots</a>
</p>

TripTime is an application for groups of friends to plan a trip together. Users will be able to collaborate in real-time plotting activities over a geographical map interface.

* Plan trips with points of interests and activities for each one.
* Collaborate with friends in planning your journey through live chat.
* Get an overview of your planned trip from Day 1 to Finish!

## Usage
### Development

To run the web application with hot module reload, execute and go to http://localhost:3000.
```shell script
$ docker-compose up
```

To run the web application in production:
```shell script
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
This deploys all three services using the configuration in `docker-compose.yml` and `docker-compose.prod.yml` (but not the dev configuration in `docker-compose.override.yml`).

The application will be served on http://localhost

## Screenshots
&ensp;

<p align="center">
  <img src="/docs/map-screenshot.png?raw=true" width="800" alt="TripTime Map">
</p>
