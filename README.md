# bedrock-session-http

[![Build Status](http://ci.digitalbazaar.com/buildStatus/icon?job=bedrock-session-http)](http://ci.digitalbazaar.com/job/bedrock-session-http)

Provides session information via a REST API

## Requirements

- npm v3+


## Usage
  - GET on `routes.session` will refresh a session & return session data.
  - DELETE on `routes.session` will delete a session. 

  GET requests will return a JSON object containing session data.
  This object should include the `session.ttl` and other data added by
  libraries that listen for the `bedrock-session-http.session.get` event.
  The ttl maybe used client side to determine when a session will expire.
