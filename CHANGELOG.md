# bedrock-session-http ChangeLog

## 4.0.1 - 2022-04-01

### Fixed
- Use `jsdoc-to-markdown@7`.

## 4.0.0 - 2022-04-01

### Changed
- **BREAKING**: Rename package to `@bedrock/session-http`.
- **BREAKING**: Convert to module (ESM).
- **BREAKING**: Remove default export.
- **BREAKING**: Require node 14.x.

### Removed
- **BREAKING**: Remove unused route config for `logout` route.

## 3.4.0 - 2022-03-27

### Changed
- Update peer deps:
  - `bedrock@4.5`
  - `bedrock-express@6.4`.
- Use `esm.js` to transpile internals from ESM to CommonJS. Should be
  a non-breaking change.

## 3.3.0 - 2022-03-08

### Changed
- Update peer dependencies.
- Update test suite to use more modern libraries.

## 3.2.1 - 2020-01-05

### Removed
- Remove deprecated GET-based logout security vulnerability.

## 3.2.0 - 2019-11-08

### Changed
- Update to latest bedrock events API.

## 3.1.0 - 2018-05-24

### Added
- Add DELETE endpoint for destroying sessions.

## 3.0.2 - 2016-09-22

### Changed
- Restructure test framework for CI.

## 3.0.1 - 2016-07-22

### Fixed
- Ensure status code is set before sending session.

## 3.0.0 - 2016-04-26

### Changed
- Logout no longer does a redirect to '/'.

## 2.0.2 - 2016-04-15

### Changed
- Update bedrock dependencies.

## 2.0.1 - 2016-03-24

### Changed
- Changed name of module from bedrock-session-rest to bedrock-session-http

## 2.0.0 - 2016-03-03

### Changed
- Update package dependencies for npm v3 compatibility.

## 1.0.0 - 2015-10-27

- See git history for changes.
