/*!
 * Copyright (c) 2015-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import '@bedrock/express';
import '@bedrock/server';
import '@bedrock/session-http';
import {mock} from './mocha/mock.data.js';

bedrock.events.on('bedrock-session-http.session.get', (req, session) => {
  if(req.session.userId) {
    session.user = mock.user;
  }
});

bedrock.events.on('bedrock-express.configure.routes', app => {
  app.post('/login', (req, res) => {
    req.session.userId = mock.user.id;
    res.json(mock.user);
  });
});

import '@bedrock/test';
bedrock.start();
