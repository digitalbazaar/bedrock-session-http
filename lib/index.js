/*
 * Bedrock Session HTTP module.
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
require('bedrock-express');

// module API
var api = {};
module.exports = api;

require('./config');

var routes = bedrock.config['session-http'].routes;

// add routes
bedrock.events.on('bedrock-express.configure.routes', function(app) {
  app.get(routes.session, function(req, res, next) {
    // emit event with request and session and let listeners add session data
    var session = {};
    bedrock.events.emit(
      'bedrock-session-http.session.get', req, session, function(err) {
        if(err) {
          return next(err);
        }
        res.status(200).json(session);
      });
  });

  app.get(routes.logout, function(req, res, next) {
    if(req.session) {
      return req.session.destroy(function(err) {
        if(err) {
          next(err);
        }
        res.sendStatus(200);
      });
    }
    res.sendStatus(404);
  });
}); // end routes
