/** @format */

import activities from './activities';
import travels from './travel-between';
const trip = {
  name: 'Around New Zealand',
  description:
    'Our 17 days trip around NZ, highlighting music party at Rotorua',
  people: [
    {
      name: 'Alice',
      avatarPath: '/dummy-img/cat-avatar.png',
    },
    {
      name: 'Bob',
      avatarPath: '/dummy-img/dog-avatar.png',
    },
    {
      name: 'Caroline',
      avatarPath: '/dummy-img/cat-avatar.png',
    },
  ],
  start: '2020-03-27',
  end: '2020-04-10',
  activities: activities,
  travels: travels,
};

export default trip;
