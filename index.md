---
layout: default
title: Contents
---

# Task breakdown and distribution #

For this section, tasks will be defined as the Must-have features outlined in the project proposal.
These are the features we determined would be part of a minimum viable product.

## Must have features ##

### Adding others to a trip ###
This task involved being able to;
- Create an account and log in. This let us uniquely identify users.
- Share a one-time unique link representing a trip, which users can then use to be added to it.
- Manually add a user to any particular event on the dashboard of the trip

Distribution:
**Anran Niu** worked on the front end functionality,
**Rafi Azman** worked on backend and creating the API for this.

### Live viewing and editing of group trip data ###
This task involved being able to;
- View the timeline of any given trip,
- Add or remove users from any activity or travel (activities are standalone events whereas travels have a start and end point)
- Add or remove activities and travels on the trip.
- Change the date, time and location of any activity or travel
- Adding notes to activities or travels in the trip.

Distribution:
**Anran Niu** worked on the front end functionality,
**Rafi Azman** worked on the backend and API to enable this.

### Viewing and editing a trip on a map ###
This task involved being able to;
- View an interactive map for any Trip
- See activities/travels that are part of the trip, with each type of activity/travel having its own respective icon to represent it.
- Get more details about an activity/travel if the marker is clicked on including participants, date/time, location and any notes associated with the event.
- Have the option to move the position of any location if needed.
- Add an activity or travel to the map

Distribution:
**Shakeel Khan** worked on being able to view the map, plotting activities/travels of a trip, adding activities/travels in a trip through the map and being able to move a maker
**Anran Niu** worked on having an event details card pop up when a marker was clicked
**Rafi Azman** worked on being able to move a marker, and adding activities/travels in a trip through the map

### Sharing a trip itinerary ###
- This task involved generating a PDF document of the trip itinerary to share with people.

**Anran Niu** worked on this functionality.

### Seeing notifications of changes ###
- TBC

### Having a CI/CD pipeline and automatic deployment ###
This task involved:
- Using TravisCI to run all unit tests when code was pushed to any branch.
- Requiring unit tests to pass before a pull request can be merged.
- Having automatic deployment upon a pull request being merged.

**Shakeel Khan** worked on this functionality

### Dockerizing our environment for easy consistent development ###
This task involved:
- Defining how many and which docker services and containers to use in the project
- Setting up the frontend and backend to run simultaneously  

**Rafi Azman** worked on this functionality

## Should have features ##

Some additional tasks were completed as well, and their breakdowns follow

### The user can have conversations with trip mates in the group ###
This task involved being able to;
- Chat with other participants in a trip
- Get an alert if a new message was received

**Anran Niu** worked on this functionality

[Meeting minutes](./Meetings.md)
