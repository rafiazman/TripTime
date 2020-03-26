/** @format */

const activities = [
  {
    id: '16b020e1-1214-4977-a40b-3df1b7407149',
    type: 'outdoor',
    start: '2020-03-30T09:00:00+13:00',
    end: '2020-03-30T16:00:00+13:00',
    name: 'Wind Turbine Walkway',
    description: 'Hike through the wind turbine walkway',
    modified: '2020-03-09T15:00:00+13:00',
    address: '3 Mount Street, Wellington',
    gps: {
      latitude: '132.39132',
      longitude: '23.39011'
    },
    notes: [
      {
        id: '16b020e1-1214-4977-a40b-3400193841',
        authorName: 'Bob',
        authorAvatarPath: '/dummy-img/cat-avatar.png',
        content: 'Bring warm clothes and water bottle',
        updated: '2020-03-10T14:00:00+13:00'
      },
      {
        id: '16b020e1-1214-4977-a40b-1930938ab',
        authorName: 'Alice',
        authorAvatarPath: '/dummy-img/dog-avatar.png',
        content: 'Remember to tie your hair girls!',
        updated: '2020-03-11T14:03:00+13:00',
      },
    ],
  },
  {
    id: '0ea1142a-eab8-4a3c-b9bd-404722915a14',
    type: 'event',
    start: '2020-04-01T09:00:00+13:00',
    end: '2020-04-01T11:00:00+13:00',
    name: 'Musical Party',
    description: 'Musical Party at Campus',
    modified: '2020-03-09T15:00:00+13:00',
    address: 'ASB Event Centre, Rotorua',
    gps: {
      latitude: '132.10031',
      longitude: '22.01342'
    },
    notes: [],
  },
  {
    id: '2172269c-2437-418a-85d5-82f8ebfa372e',
    type: 'eating',
    start: '2020-04-05T11:00:00+13:00',
    end: '2020-04-05T13:00:00+13:00',
    name: 'Lunch',
    description: 'Lunch at 88 Restaurant',
    modified: '2020-03-09T15:00:00+13:00',
    address: '10 Remuera Street, Auckland',
    gps: {
      latitude: '131.34211',
      longitude: '22.39490'
    },
    notes: [
      {
        id: '142020e1-1214-4977-a40b-1090938ab',
        authorName: 'Alice',
        authorAvatarPath: '/dummy-img/dog-avatar.png',
        content: 'Let me know if anyone is vegetarian',
        updated: '2020-03-19T15:03:00+13:00',
      },
    ],
  },
  {
    id: '862bb995-12a7-46fa-bf74-1b0c35a8c9aa',
    type: 'relax',
    start: '2020-03-31T09:00:00+13:00',
    end: '2020-03-31T11:00:00+13:00',
    name: 'Hotel relax time',
    description: 'Relax at hotel and play cards',
    modified: '2020-03-26T15:00:00+13:00',
    address: '184 Khyber Pass Road, Newmarket',
    gps: {
      latitude: '223.23413',
      longitude: '24.23412'
    },
    notes: [],
  },
];

export default activities;
