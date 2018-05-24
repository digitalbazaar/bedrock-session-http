/*
 * Copyright (c) 2015-2018 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
const mockData = require('./mocha/mock.data');
require('bedrock-session-http');

bedrock.events.on('bedrock-session-http.session.get', (req, session) => {
  if(req.session.userId) {
    session.user = mockData.user;
  }
});

bedrock.events.on('bedrock-express.configure.routes', app => {
  app.post('/login', (req, res) => {
    req.session.userId = mockData.user.id;
    res.json(mockData.user);
  });
});

require('bedrock-test');
bedrock.start();
