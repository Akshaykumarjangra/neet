module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '\\.spec\\.ts$',
    '/tests/e2e/'
  ],
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  }
};
