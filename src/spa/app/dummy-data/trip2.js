/** @format */

import activities from './activities';
import travels from './travel-between';
const trip2 = {
  name: 'Taipei Yummy Trip',
  description: 'Enjoy yummy food in Taipei',
  people: [
    {
      name: 'Alice',
      avatarPath: '/img/avatar/cat-avatar.png',
    },
    {
      name: 'Judy',
      avatarPath: '/img/avatar/chick-avatar.jpg',
    },
  ],
  start: '2020-01-19',
  end: '2020-01-30',
  activities: activities,
  travels: travels,
};

export default trip2;
