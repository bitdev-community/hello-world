// Override the Jest config to ignore transpiling from specific folders
// See the base Jest config: https://bit.cloud/teambit/react/react/~code/jest/jest.config.js

const { jestConfig } = require('@teambit/react.react-env');
// const { esmConfig } = require('@teambit/react.jest.react-jest');

const {
  generateNodeEnvModulesPattern,
} = require('@teambit/dependencies.modules.packages-excluder');

const packagesToExclude = ['@teambit', '@my-org', 'my-package-name'];

module.exports = {
  // ...esmConfig,
  ...jestConfig,
  testEnvironment: 'nodeEnv-env',
  setupFiles: [],
  setupFilesAfterEnv: [],
  transformIgnorePatterns: [
    '^.+.module.(css|sass|scss)$',
    generateNodeEnvModulesPattern({
      packages: packagesToExclude,
      excludeComponents: true,
    }),
  ],
};
