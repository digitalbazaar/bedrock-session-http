/*!
 * Copyright (c) 2015-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import {asyncHandler} from '@bedrock/express';

import './config.js';

// add routes
bedrock.events.on('bedrock-express.configure.routes', function(app) {
  const {routes} = bedrock.config['session-http'];

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
}); // end routes
