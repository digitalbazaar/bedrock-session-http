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
    var session = {};
    if(req.user) {
      // pick data to be served
      if(req.user.id) {
        session.id = req.user.id;
      }
    }
    res.json(session);
  });
});
