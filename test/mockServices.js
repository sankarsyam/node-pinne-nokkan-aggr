import nock from 'nock';
import dotenv from 'dotenv';
const experienceFlowService = nock(process.env.EXPERIENCE_FLOW_API_URL)
  .filteringPath(path => {
    if (path.match(/^\/api\/v1\/flows.*/)) return '/api/v1/flows';
  })
  .get('/api/v1/flows')
  .times(20)
  .reply(200, [
    {
      _id: '5987f9ee9c832130c0074037',
      action: {
        _id: '596e471297aa3418cce56110',
      },
      name: 'Room is Ready',
      isActive: true,
      triggerCriteria: [
        {
          trigger: {
            _id: '597b66086e212320e0a7a136',
            type: 'Room',
            subType: 'isReady',
            subTypePath: 'isReady',
            __v: 0,
            values: ['True', 'False'],
          },
          value: 'True',
          _id: '5987f9ee9c832130c0074037',
        },
      ],
    },
    {
      _id: '5987f9ee9c832130c0074038',
      action: {
        _id: '596e471297aa3418cce56111',
      },
      name: 'Guest in Lobby',
      isActive: true,
      triggerCriteria: [
        {
          trigger: {
            _id: '597b66086e212320e0a7a137',
            type: 'Location',
            subType: 'Lobby',
            subTypePath: 'location.name',
            location: '597a3cf5f933ec164ebf1b89',
            __v: 0,
            values: ['Inside', 'Outside'],
          },
          value: 'Inside',
          _id: '5987f9ee9c832130c0074038',
        },
      ],
    },
    {
      _id: '5987f9ee9c832130c0074038',
      action: {
        _id: '596e471297aa3418cce56111',
      },
      name: 'Guest Not in Lobby',
      isActive: true,
      triggerCriteria: [
        {
          trigger: {
            _id: '597b66086e212320e0a7a137',
            type: 'Location',
            subType: 'Lobby',
            subTypePath: 'location.name',
            location: '597a3cf5f933ec164ebf1b89',
            __v: 0,
            values: ['Inside', 'Outside'],
          },
          value: 'Outside',
          _id: '5987f9ee9c832130c0074038',
        },
      ],
    },
    {
      _id: '5987f9ee9c832130c0074038',
      action: {
        _id: '596e471297aa3418cce56111',
      },
      name: 'Happy Birthday',
      isActive: true,
      triggerCriteria: [
        {
          trigger: {
            _id: '597b66086e212320e0a7a137',
            type: 'Profile',
            subType: 'birthdayDate',
            subTypePath: 'birthdayDate',
            values: ['Day Before', 'Day of', 'Day After'],
          },
          value: 'Day of',
          _id: '5987f9ee9c832130c0074038',
        },
      ],
    },
    {
      _id: '5987f9ee9c832130c0074038',
      action: {
        _id: '596e471297aa3418cce56111',
      },
      name: '2 Adults',
      isActive: true,
      triggerCriteria: [
        {
          trigger: {
            _id: '597b66086e212320e0a7a133',
            type: 'Reservation',
            subType: 'numberOfAdults',
            subTypePath: 'numberOfAdults',
            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          value: '2',
          _id: '5987f9ee9c832130c0074038',
        },
      ],
    },
    {
      _id: '5987f9ee9c832130c0074038',
      action: {
        _id: '596e471297aa3418cce56111',
      },
      name: 'Action Completed',
      isActive: true,
      triggerCriteria: [
        {
          trigger: {
            _id: '597b66086e212320e0a7a149',
            type: 'Action',
            subType: 'Give Keys',
            subTypePath: 'isCompleted',
            action: '596e471297aa3418cce56111',
            values: ['Completed', 'Not Completed'],
          },
          value: 'Completed',
          _id: '5987f9ee9c832130c0074038',
        },
      ],
    },
  ]);

const roomService = nock(process.env.HMS_API_URL)
  .filteringPath(path => {
    if (path.match(/^\/api\/v1\/rooms\?.*/)) return '/api/v1/rooms';
  })
  .get('/api/v1/rooms')
  .times(10)
  .reply(200, [
    {
      _id: '59785cfb9af22f001c691831',
      profileID: '595b949f4a7bb4001c229c14',
      roomNumber: 718,
      location: {
        _id: '597a3cf5f933ec164ebf1b8c',
        name: 'Room',
        longitude: 23.2342342,
        latitude: 41.23423,
        radius: 10,
        __v: 0,
      },
      isReady: true,
    },
  ]);

const reservationService = nock(process.env.HMS_API_URL)
  .filteringPath(path => {
    if (path.match(/^\/api\/v1\/reservations\?profileID=595b949f4a7bb4001c229c13/))
      return '/api/v1/hotel/reservations/id';
  })
  .get('/api/v1/hotel/reservations/id')
  .times(10)
  .reply(200, [
    {
      _id: '59785f6c9af22f001c691832',
      profileID: '595b949f4a7bb4001c229c13',
      arrivalDate: '2017-08-04T21:33:09.116Z',
      departureDate: null,
      numberOfAdults: 2,
      numberOfChildren: 3,
      notes: 'reservation',
      room: {
        _id: '59785cfb9af22f001c691831',
        profileID: '595b949f4a7bb4001c229c13',
        roomNumber: 718,
        location: {
          _id: '597a3cf5f933ec164ebf1b8c',
          name: 'Restaurant',
          longitude: 23.2342342,
          latitude: 41.23423,
          radius: 10,
          __v: 0,
        },
        __v: 0,
        isReady: true,
      },
      type: 'hotel',
      __v: 0,
      isCheckedIn: true,
      numberOfNights: 0,
      id: '59785f6c9af22f001c691832',
    },
  ]);

const actionService = nock(process.env.DISPATCH_API_URL)
  .filteringPath(path => {
    if (path.match(/^\/api\/v1\/actions\?.*/)) return '/api/v1/actions';
  })
  .get('/api/v1/actions')
  .times(100)
  .reply(200, [
    {
      _id: '597f6181ac8e1d2eb78f1403',
      action: {
        _id: '596e471297aa3418cce56111',
        name: 'Give Keys To Guest',
        description: 'Give the keys guest',
        needsCompletionConfirmation: false,
        expiresInMinutes: '5',
        actors: ['Bell Hop', 'Front Desk'],
        offerLimit: '1',
        shouldSendTextMessage: false,
        textMessage: '',
        scriptSample:
          "Hey Mr. {Guest's name},  Welcome to the Hotel, here are your keys and your room number is {room number}, Let me take your bags for you.",
        directives: ['Give keys to guest and explain where room is', 'Offer to take bags to room'],
        isTriggerEvent: true,
      },
      profileID: '595b949f4a7bb4001c229c13',
      actionID: '596e471297aa3418cce56110',
      expirationDate: '2017-07-31T17:02:37.726Z',
      startedDate: null,
      finishedDate: null,
      __v: 0,
      id: '597f6181ac8e1d2eb78f1403',
      isCompleted: true,
      isExpired: false,
    },
  ]);

const locationService = nock(process.env.LOCATION_API_URL)
  .filteringPath(path => {
    if (path.match(/^\/api\/v1\/locations/)) return '/api/v1/locations';
  })
  .get('/api/v1/locations')
  .times(4)
  .reply(200, {
    _id: '597a3cf5f933ec164ebf1b89',
    name: 'Lobby',
    longitude: 23.2342342,
    latitude: 41.23423,
    radius: 8,
  });

const userLocationsService = nock(process.env.LOCATION_API_URL)
  .filteringPath(path => {
    if (path.match(/^\/api\/v1\/userLocations\?profileID=595b949f4a7bb4001c229c13/))
      return '/api/v1/userLocationsLobby';
    if (path.match(/^\/api\/v1\/userLocations\?profileID=595b949f4a7bb4001c229c14/))
      return '/api/v1/userLocationsAirport';
  })
  .get('/api/v1/userLocationsLobby')
  .times(16)
  .reply(200, [
    {
      _id: '597b2efb4f751014d095caa5',
      dateCreated: '2017-07-28T12:32:59.449Z',
      profileID: '595b949f4a7bb4001c229c13',
      location: {
        _id: '597a3cf5f933ec164ebf1b8b',
        name: 'Lobby',
        longitude: 23.2342342,
        latitude: 41.23423,
        radius: 8,
      },
    },
  ])
  .get('/api/v1/userLocationsAirport')
  .times(16)
  .reply(200, [
    {
      _id: '597b2efb4f751014d095caa5',
      dateCreated: '2017-07-28T12:32:59.449Z',
      profileID: '595b949f4a7bb4001c229c13',
      location: {
        _id: '597a3cf5f933ec164ebf1b8b',
        name: 'Air Port',
        longitude: 23.2342342,
        latitude: 41.23423,
        radius: 8,
      },
    },
  ]);

const profileService = nock(process.env.PROFILE_API_URL)
  .filteringPath(path => {
    if (path.match(/^\/api\/v1\/profiles\?profileID=595b949f4a7bb4001c229c13/)) return '/api/v1/profiles';
  })
  .get('/api/v1/profiles')
  .times(10)
  .reply(200, [
    {
      _id: '595b949f4a7bb4001c229c13',
      firstName: 'Jerad',
      lastName: 'Kline',
      nickName: 'Jerad',
      birthdayDate: new Date(),
      marriedDate: null,
      email: 'jerad@gmail.com',
      company: 'Super Corp America',
      password: 'testpass',
      type: 'guest',
      childrenNumber: 3,
      spouce: null,
      phoneNumber: '750-356-4568',
      isAdmin: false,
      preferences: {
        wantsPromotions: true,
      },
      currentStayPreferences: {
        hasBeenInLobby: false,
      },
      travelingWith: null,
      gender: 'Male',
      homeAddress: {
        address1: '127 anystreet rd',
        address2: null,
        city: 'Anytown',
        state: 'CO',
        zipCode: 123456,
      },
      imageURL: null,
      dateCreated: '2017-07-28T12:32:14.091Z',
    },
  ]);

const dispatchService = nock(process.env.DISPATCH_API_URL).post('/api/v1/actions').times(100).reply(201, [
  {
    _id: '597f6181ac8e1d2eb78f1403',
    action: {
      actors: ['bellhop', 'staffBoy'],
      directives: [],
      __v: 0,
      isTriggerEvent: false,
      scriptSample:
        'We noticed that you brought your clubs with you, we have some open tee times if you would like a to use a golf cart, on us',
      textMessage: 'We welcomes you.',
      offerLimit: 1,
      expiresInMinutes: 5,
      needsCompletionConfirmation: false,
      description: 'Offer the guest a free golf cart',
      name: 'Free Golf Cart updated',
      _id: '596e471297aa3418cce56112',
    },
    profileID: '595b949f4a7bb4001c229c13',
    actionID: '596e471297aa3418cce56110',
    expirationDate: '2017-07-31T17:02:37.726Z',
    startedDate: null,
    finishedDate: null,
    __v: 0,
    id: '597f6181ac8e1d2eb78f1403',
    isCompleted: true,
    isExpired: false,
  },
]);
