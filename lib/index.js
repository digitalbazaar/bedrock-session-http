/*
 * Bedrock Session HTTP module.
 *
 * Copyright (c) 2015-2018 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
const {asyncHandler} = require('bedrock-express');

// module API
const api = {};
module.exports = api;

require('./config');

const routes = bedrock.config['session-http'].routes;

// add routes
bedrock.events.on('bedrock-express.configure.routes', function(app) {
  app.get(routes.session, asyncHandler(async (req, res) => {
    // emit event with request and session and let listeners add session data
    const session = {};
    await bedrock.events.emit(
      'bedrock-session-http.session.get', req, session);
    res.status(200).json(session);
  }));

  app.delete(routes.session, (req, res, next) => {
    if(req.session) {
      return req.session.destroy(err => {
        if(err) {
          return next(err);
        }
        res.sendStatus(200);
      });
    }
    res.sendStatus(404);
  });

  // TODO: deprecated, remove non-idempotent GET-based logout
  app.get(routes.logout, (req, res, next) => {
    if(req.session) {
      return req.session.destroy(err => {
        if(err) {
          next(err);
        }
        res.sendStatus(200);
      });
    }
    res.sendStatus(404);
  });
}); // end routes
