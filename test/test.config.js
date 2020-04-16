/*
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
const {config} = require('bedrock');
const path = require('path');

// tests
config.mocha.tests.push(path.join(__dirname, 'mocha'));
