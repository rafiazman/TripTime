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
      avatarPath: '/img/avatar/cat-avatar.png',
    },
    {
      name: 'Bob',
      avatarPath: '/img/avatar/dog-avatar.png',
    },
    {
      name: 'Caroline',
      avatarPath: '/img/avatar/fox-avatar.jpg',
    },
  ],
  start: '2020-04-17',
  end: '2020-05-17',
  activities: activities,
  travels: travels,
};

export default trip;
