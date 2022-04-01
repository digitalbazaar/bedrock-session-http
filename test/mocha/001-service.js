/*!
 * Copyright (c) 2015-2012 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';
import {mock} from './mock.data.js';
import requestModule from 'request';
const request = requestModule.defaults({json: true, strictSSL: false});
const jar = request.jar();

const sessionService = config.server.baseUri +
  config['session-http'].routes.session;

describe('session-service', function() {
  describe('unauthenticated', function() {
    it('should return an empty object', function(done) {
      request({
        url: sessionService,
        method: 'GET',
        jar
      }, function(err, res, body) {
        should.not.exist(err);
        res.statusCode.should.equal(200);
        should.exist(body);
        body.should.be.an('object');
        Object.keys(body).length.should.equal(0);
        done();
      });
    });
  });

  describe('authenticated', function() {
    beforeEach(async function() {
      await login();
    });

    it('should provide information about the current session', function(done) {
      request({
        url: sessionService,
        method: 'GET',
        jar
      }, function(err, res, body) {
        should.not.exist(err);
        res.statusCode.should.equal(200);
        should.exist(body);
        body.should.be.an('object');
        should.exist(body.user);
        body.user.should.be.an('object');
        body.user.id.should.be.a('string');
        body.user.id.should.equal(mock.user.id);
        done();
      });
    });

    it('should return an empty object after logout', async function() {
      await logout();
      let body;
      const res = await (new Promise((resolve, reject) => {
        request({
          url: sessionService,
          method: 'GET',
          jar
        }, function(err, res, _body) {
          if(err) {
            return reject(err);
          }
          body = _body;
          resolve(res);
        });
      }));
      res.statusCode.should.equal(200);
      should.exist(body);
      body.should.be.an('object');
      Object.keys(body).length.should.equal(0);
    });
  });
});

async function login() {
  return new Promise((resolve, reject) => {
    request.post({
      url: config.server.baseUri + '/login',
      jar
    }, (err, response) => err ? reject(err) : resolve(response));
  });
}

async function logout() {
  return new Promise((resolve, reject) => {
    request({
      url: sessionService,
      method: 'DELETE',
      jar
    }, (err, response) => err ? reject(err) : resolve(response));
  });
}
