module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@/(.*)$': '<rootDir>/client/src/$1'
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/e2e/",
    "/client/src/components/mentors/bookingUtils.spec.ts",
    "/server/mentor-booking-utils.spec.ts",
    "/server/mock-exam-flow.spec.ts",
    "/server/mock-exam-scoring.spec.ts"
  ]
};
