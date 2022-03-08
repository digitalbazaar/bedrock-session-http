/*!
 * Copyright (c) 2015-2022 Digital Bazaar, Inc. All rights reserved.
 */
const {config} = require('bedrock');
const path = require('path');
require('bedrock-express');

// tests
config.mocha.tests.push(path.join(__dirname, 'mocha'));

config.express.useSession = true;
