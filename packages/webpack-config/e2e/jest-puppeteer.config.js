/* eslint-env node */
const assert = require('assert');

const e2eSkipBuild = process.env.EXPO_E2E_SKIP_BUILD;
const e2eCommand = process.env.EXPO_E2E_COMMAND;

const launch = process.env.CI
  ? {
      args: ['--ignore-certificate-errors', '--no-sandbox', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
      headless: true,
    }
  : {
      args: ['--ignore-certificate-errors'],
      ignoreHTTPSErrors: true,
      headless: true,
    };

const config = {
  start: {
    url: 'https://localhost:19006', // versioned CLI only supports 19006 for webpack projects
    launch,
    server: {
      command: `node e2e/run-start.js --project e2e/basic/`,
      port: 19006,
      launchTimeout: 60000,
      debug: true,
    },
  },
  build: {
    url: 'http://localhost:3000',
    launch,
    server: {
      command: e2eSkipBuild
        ? `node e2e/run-build.js --project e2e/basic/ --port 3000`
        : `node e2e/run-build.js --project e2e/basic/ --port 3000 --build`,
      port: 3000,
      launchTimeout: 60000,
      debug: true,
    },
  },
}[e2eCommand];

assert(e2eCommand, `EXPO_E2E_COMMAND must be defined`);
assert(
  config,
  `"${e2eCommand}" is not a valid E2E test. Expected one of ${Object.keys(config).join(', ')}`
);

module.exports = config;
