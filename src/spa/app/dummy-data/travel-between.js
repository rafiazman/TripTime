/** @format */

const travels = [
  {
    id: '1',
    start: '2020-03-30T09:00:00+13:00',
    end: '2020-03-30T16:00:00+13:00',
    type: 'travel',
    mode: 'bus',
    description: 'Bus from Rotorua to Auckland',
    from: {
      lat: '-38.1368',
      lng: '176.2497',
    },
    to: {
      lat: '-36.8485',
      lng: '174.7633',
    },
    people: [
      {
        name: 'Bob',
        avatarPath: '/img/avatar/avatar1.jpg',
      },
      {
        name: 'Alice',
        avatarPath: '/img/avatar/avatar3.jpg',
      },
    ],
    notes: [],
  },
  {
    id: '2',
    start: '2020-03-31T09:00:00+13:00',
    end: '2020-03-31T16:00:00+13:00',
    type: 'travel',
    mode: 'horse',
    description: 'Horse to Taupo',
    from: {
      lat: '-36.8485',
      lng: '174.7633',
    },
    to: {
      lat: '-38.6857',
      lng: '176.0702',
    },
    people: [
      {
        name: 'Bob',
        avatarPath: '/img/avatar/avatar1.jpg',
      },
      {
        name: 'Alice',
        avatarPath: '/img/avatar/avatar3.jpg',
      },
    ],
    notes: [],
  },
  {
    id: '3',
    start: '2020-04-01T15:00:00+13:00',
    end: '2020-04-01T16:00:00+13:00',
    type: 'travel',
    mode: 'plane',
    description: 'Fly to Wellington',
    from: {
      lat: '-43.5321',
      lng: '172.6362',
    },
    to: {
      lat: '-41.2865',
      lng: '174.7762',
    },
    people: [
      {
        name: 'Alice',
        avatarPath: '/img/avatar/avatar3.jpg',
      },
    ],
    notes: [
      {
        id: '16b020e1-1214-4977-a40b-193093345',
        author: {
          name: 'Alice',
          avatarPath: '/img/avatar/avatar3.jpg',
        },
        content: 'Bring snacks',
        updated: '2020-03-27T22:33:00+13:00',
      },
    ],
  },
];

export default travels;
