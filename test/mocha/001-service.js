/*
 * Copyright (c) 2015-2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const async = require('async');
const bedrock = require('bedrock');
const config = bedrock.config;
const mockData = require('./mock.data');
let request = require('request');
request = request.defaults({json: true, strictSSL: false});
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
    beforeEach(function(done) {
      login(done);
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
        body.user.id.should.equal(mockData.user.id);
        done();
      });
    });

    it('should return an empty object after logout', function(done) {
      async.series([
        function(callback) {
          logout(callback);
        },
        function(callback) {
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
            callback();
          });
        }
      ], done);
    });
  });

});

function login(callback) {
  request.post({
    url: config.server.baseUri + '/login',
    jar
  }, callback);
}

function logout(callback) {
  request({
    url: sessionService,
    method: 'DELETE',
    jar
  }, callback);
}
