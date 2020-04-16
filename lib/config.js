/*
 * Bedrock Session REST Module Configuration
 *
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config} = require('bedrock');

const basePath = '/session';

config['session-http'] = {};
config['session-http'].routes = {};
config['session-http'].routes.session = basePath;
config['session-http'].routes.logout = basePath + '/logout';
