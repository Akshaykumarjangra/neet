module.exports = {
  testEnvironment: 'node',
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/e2e/",
    // "node:test" tests shouldn't be run by Jest because Jest won't execute them as tests anyway,
    // and they might use native node imports that ts-jest objects to.
    "server/mock-exam-scoring\\.spec\\.ts",
    "server/mentor-booking-utils\\.spec\\.ts",
    "client/src/components/mentors/bookingUtils\\.spec\\.ts",
    "server/mock-exam-flow\\.spec\\.ts"
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      diagnostics: false,
    }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  },
};
