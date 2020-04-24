/** @format */

const travels = [
  {
    start: '2020-03-30T09:00:00+13:00',
    end: '2020-03-30T16:00:00+13:00',
    type: 'travel',
    mode: 'bus',
    description: 'Bus from Rotorua to Auckland',
    from: {
      latitude: '131.34211',
      longitude: '22.39490',
    },
    to: {
      latitude: '223.23413',
      longitude: '24.23412',
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
    start: '2020-03-31T09:00:00+13:00',
    end: '2020-03-31T16:00:00+13:00',
    type: 'travel',
    mode: 'horse',
    description: 'Horse to Taupo',
    from: {
      latitude: '131.34211',
      longitude: '22.39490',
    },
    to: {
      latitude: '223.23413',
      longitude: '24.23412',
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
    start: '2020-04-01T15:00:00+13:00',
    end: '2020-04-01T16:00:00+13:00',
    type: 'travel',
    mode: 'plane',
    description: 'Fly to Wellington',
    from: {
      latitude: '131.34211',
      longitude: '22.39490',
    },
    to: {
      latitude: '223.23413',
      longitude: '24.23412',
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
