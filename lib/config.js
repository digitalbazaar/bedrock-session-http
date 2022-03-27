/*!
 * Copyright (c) 2015-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from 'bedrock';

const basePath = '/session';

config['session-http'] = {};
config['session-http'].routes = {};
config['session-http'].routes.session = basePath;
config['session-http'].routes.logout = basePath + '/logout';
