/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/e2e/',
    // Ignored because they use native node:test syntax instead of Jest
    '/server/mentor-booking-utils.spec.ts',
    '/server/mock-exam-flow.spec.ts',
    '/server/mock-exam-scoring.spec.ts',
    '/client/src/components/mentors/bookingUtils.spec.ts',
    '/server/telemetry-routes.spec.ts'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ]
};
