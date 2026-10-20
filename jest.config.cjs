/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['\\.spec\\.ts$', '/tests/e2e/'],
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  }
};
