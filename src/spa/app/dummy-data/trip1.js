/** @format */

import activities from './activities';
import travels from './travel-between';
const trip1 = {
  name: 'Thailand Adventure',
  description: 'Our Thailand adventure',
  people: [
    {
      name: 'Alice',
      avatarPath: '/img/avatar/avatar12.jpg',
    },
    {
      name: 'David',
      avatarPath: '/img/avatar/avatar4.jpg',
    },
  ],
  start: '2020-05-19',
  end: '2020-05-30',
  activities: activities,
  travels: travels,
};

export default trip1;
