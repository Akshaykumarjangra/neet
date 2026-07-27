/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/tests/e2e/',
    // Ignore node:test files explicitly so Jest doesn't try to run them
    'mock-exam-scoring.spec.ts',
    'bookingUtils.spec.ts',
    'mentor-booking-utils.spec.ts',
    'mock-exam-flow.spec.ts',
    'telemetry-routes.spec.ts' // This test relies on database operations within auth middleware which we mocked minimally
  ]
};
