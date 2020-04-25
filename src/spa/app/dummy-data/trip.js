/** @format */

import activities from './activities';
import travels from './travel-between';
const trip = {
  name: 'Around New Zealand',
  type: 'sightseeing',
  description:
    'Our 17 days trip around NZ, highlighting music party at Rotorua',
  people: [
    {
      name: 'Alice',
      avatarPath: '/img/avatar/avatar3.jpg',
    },
    {
      name: 'Bob',
      avatarPath: '/img/avatar/avatar4.jpg',
    },
    {
      name: 'Caroline',
      avatarPath: '/img/avatar/avatar1.jpg',
    },
  ],
  start: '2020-04-17',
  end: '2020-05-17',
  activities: activities,
  travels: travels,
};

export default trip;
