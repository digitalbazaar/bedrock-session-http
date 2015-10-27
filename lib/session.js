/*
 * Bedrock Session REST module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
require('bedrock-express');

// module API
var api = {};
module.exports = api;

require('./config');

bedrock.events.on('bedrock.test.configure', function() {
  // load test config
  require('./test.config');
});

// add routes
bedrock.events.on('bedrock-express.configure.routes', function(app) {
  var routes = bedrock.config['session-rest'].routes;

  app.get(routes.session, function(req, res, next) {
    // emit event with request and session and let listeners add session data
    var session = {};
    bedrock.events.emit(
      'bedrock-session-rest.session.get', req, session, function(err) {
      if(err) {
        return next(err);
      }
      res.json(session);
    });
  });
});
