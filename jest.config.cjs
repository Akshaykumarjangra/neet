module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    'tests/e2e/.*', // Ignore Playwright tests
    // Ignore node:test files so jest doesn't try to parse and run them
    'server/mock-exam-scoring.spec.ts',
    'server/mentor-booking-utils.spec.ts',
    'client/src/components/mentors/bookingUtils.spec.ts',
    'server/mock-exam-flow.spec.ts',
    // Ignore telemetry-routes due to babel dependency requirement for express type
    'server/telemetry-routes.spec.ts'
  ]
};
