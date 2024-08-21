/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/__tests__/components/render.tsx',
  ],
};

export default config;
