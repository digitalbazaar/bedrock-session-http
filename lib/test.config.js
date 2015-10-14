/*
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */

var config = require('bedrock').config;
var path = require('path');

// tests
config.mocha.tests.push(path.join(__dirname, '..', 'tests'));

config['session-rest'].test = {};

config['session-rest'].test.user = {
  id: 'c2c71787-e40f-42f8-8d31-15a73db68746',
  name: 'Bedrock User'
};
