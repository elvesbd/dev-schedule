import { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@tests/(.+)': '<rootDir>/tests/$1',
    '@adapters/(.+)': '<rootDir>/src/adapters/$1',
    '@core/(.+)': '<rootDir>/src/core/$1',
    '@external/(.+)': '<rootDir>/src/external/$1',
    '@extensions/(.+)': '<rootDir>/src/extensions/$1',
  },
};

export default config;
