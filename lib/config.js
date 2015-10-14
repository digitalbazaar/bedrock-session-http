/*
 * Bedrock Session REST Module Configuration
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;

config['session-rest'] = {};
config['session-rest'].routes = {};
config['session-rest'].routes.session = '/session';
