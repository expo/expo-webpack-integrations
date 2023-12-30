/** @type {import('jest').Config} */
module.exports = {
  ...require('expo-module-scripts/jest-preset-cli'),
  rootDir: __dirname,
  displayName: require('./package').name,
};
