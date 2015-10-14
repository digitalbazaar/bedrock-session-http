/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var config = bedrock.config;
var brPassport = require('bedrock-passport');
var LocalStrategy = require('passport-local').Strategy;
var passport = brPassport.passport;
var bodyParser = require('body-parser');
require('bedrock-express');
require('bedrock-requirejs');
require('bedrock-server');
require('../lib/api');

// returns the test user regardless of what username/password is used
passport.use(new LocalStrategy(function(username, password, done) {
    return done(null, config['session-rest'].test.user);
  }));

// put the user object into the session
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

// pull the user object out of the session
passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

bedrock.events.on('bedrock-express.configure.routes', function(app) {

  app.post(
    '/login', bodyParser.urlencoded({extended: false}),
    passport.authenticate('local'), function(req, res, next) {
      res.json(req.user);
    });

  app.get('/logout', function(req, res) {
    if(req.isAuthenticated()) {
      req.logout();
      res.json({status: 'success'});
      return;
    }
    res.json({status: 'failure'});
  });
});

bedrock.start();
