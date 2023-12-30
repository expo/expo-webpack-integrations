const { transform, watchPlugins } = require('expo-module-scripts/jest-preset-cli');

/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-puppeteer',
  displayName: require('../package').name,
  resetModules: false,
  rootDir: __dirname,
  transform,
  watchPlugins,
};
