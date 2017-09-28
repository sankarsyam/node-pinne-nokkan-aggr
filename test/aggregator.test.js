import request from 'supertest';
import httpStatus from 'http-status';
import server from './../server.js';
import chai from 'chai';
import expect from 'expect';
import http from 'http';

import { experienceFlowService, reservationService, actionService, dispatchService } from './mockServices';

const port = process.env.PORT;

describe('Paths', () => {
  before(() => {
    server.listen(port);
  });
  after(() => {
    server.close();
  });
  describe('[GET]', () => {
    describe('/', () => {
      it('should return 200', done => {
        http.get('http://localhost:' + port, response => {
          expect(response.statusCode).toEqual(200);
          done();
        });
      });
    });
  });

  describe('/api/v1/action', () => {
    describe('[POST]', () => {
      it('should get action event processed and send action to dispatch', done => {
        request(server)
          .post('/api/v1/action')
          .send({ profileID: '595b949f4a7bb4001c229c13' })
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toInclude('Action Completed');
            done();
          })
          .catch(done);
      });
    });
  });

  describe('/api/v1/userLocation', () => {
    describe('[POST]', () => {
      it('should get location event processed and send action to dispatch', done => {
        request(server)
          .post('/api/v1/location')
          .send({ profileID: '595b949f4a7bb4001c229c13' })
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toInclude('Guest in Lobby');
            done();
          })
          .catch(done);
      });
      it('should get location outside event processed and send action to dispatch', done => {
        request(server)
          .post('/api/v1/location')
          .send({ profileID: '595b949f4a7bb4001c229c14' })
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toInclude('Guest Not in Lobby');
            done();
          })
          .catch(done);
      });
    });
  });

  describe('/api/v1/profile', () => {
    describe('[POST]', () => {
      it('should get profile event processed and send action to dispatch', done => {
        request(server)
          .post('/api/v1/profile/birthdayDate')
          .send({ profileID: '595b949f4a7bb4001c229c13' })
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toInclude('Happy Birthday');
            done();
          })
          .catch(done);
      });
    });
  });

  describe('/api/v1/reservation', () => {
    describe('[POST]', () => {
      it('should get reservation event processed and send action to dispatch', done => {
        request(server)
          .post('/api/v1/reservation/numberOfAdults')
          .send({ profileID: '595b949f4a7bb4001c229c13' })
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toInclude('2 Adults');
            done();
          })
          .catch(done);
      });
    });
  });

  describe('/api/v1/room', () => {
    describe('[POST]', () => {
      it('should get room event processed and send action to dispatch', done => {
        request(server)
          .post('/api/v1/room/isReady')
          .send({ profileID: '595b949f4a7bb4001c229c13' })
          .expect(httpStatus.OK)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toInclude('Room is Ready');
            done();
          })
          .catch(done);
      });
    });
  });
});
