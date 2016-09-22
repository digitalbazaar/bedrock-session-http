/*
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var mockData = require('./mocha/mock.data');
require('bedrock-session-http');

var user = null;

bedrock.events.on('bedrock-session-http.session.get', function(req, session) {
  if(user) {
    session.id = user.id;
  }
});

bedrock.events.on('bedrock-express.configure.routes', function(app) {
  app.post('/login', function(req, res) {
    user = mockData.user;
    res.json(user);
  });

  app.get('/logout', function(req, res) {
    user = null;
    res.json({status: 'success'});
  });
});

require('bedrock-test');
bedrock.start();
