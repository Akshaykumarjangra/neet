/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    'server/mentor-booking-utils.spec.ts',
    'server/mock-exam-scoring.spec.ts',
    'server/mock-exam-flow.spec.ts',
    'client/src/components/mentors/bookingUtils.spec.ts',
    'tests/e2e/',
  ],
};