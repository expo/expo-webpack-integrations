/** @type {import('jest').Config} */
module.exports = {
  ...require('expo-module-scripts/jest-preset-cli'),
  rootDir: __dirname,
  roots: ['__mocks__', 'src'],
  displayName: require('./package').name,
};
