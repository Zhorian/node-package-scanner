const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' });

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper,
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  setupFilesAfterEnv: ['./spec/test-setup.ts'],
};
