/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
 /* global describe, it, require, should */
 /* jshint node: true */

'use strict';
var async = require('async');
var bedrock = require('bedrock');
var config = bedrock.config;
var request = require('request');
request = request.defaults({json: true, jar: true});

var sessionService = config.server.baseUri +
  config['session-rest'].routes.session;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

describe('session-service', function() {
  describe('unauthenticated', function() {
    it('should return an empty object', function(done) {
      request({
        url: sessionService,
        method: 'GET'
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
        method: 'GET'
      }, function(err, res, body) {
        should.not.exist(err);
        res.statusCode.should.equal(200);
        should.exist(body);
        body.should.be.an('object');
        should.exist(body.id);
        body.id.should.be.a('string');
        body.id.should.equal(config['session-rest'].test.user.id);
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
            method: 'GET'
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
    url: config.server.baseUri + '/login'
  }, callback);
}

function logout(callback) {
  request({
    url: config.server.baseUri + '/logout',
    method: 'GET'
  }, callback);
}
