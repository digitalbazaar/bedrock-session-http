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

bedrock.events.on('bedrock.test.configure', function() {
  // load test config
  require('./test.config');
});

var routes = bedrock.config['session-http'].routes;
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', routes);

// add routes
bedrock.events.on('bedrock-express.configure.routes', function(app) {
  console.log('ROUTES.SESSION^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6^^^^^^^^^^^^', routes.session);
  app.get(routes.session, function(req, res, next) {
    // emit event with request and session and let listeners add session data
    var session = {};
    bedrock.events.emit(
      'bedrock-session-http.session.get', req, session, function(err) {
      if(err) {
        return next(err);
      }
      res.json(session);
    });
  });

  app.get(routes.logout, function(req, res, next) {
    if(req.session) {
      return req.session.destroy(function(err) {
        if(err) {
          next(err);
        }
        res.redirect('/');
      });
    }
    res.redirect('/');
  });
}); // end routes
