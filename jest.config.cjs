/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@shared/(.*)$": "<rootDir>/shared/$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/e2e/",
    // Ignore node:test files explicitly to stop jest parse errors on node:test runner native syntax in ESM
    "server/mentor-booking-utils.spec.ts",
    "server/mock-exam-scoring.spec.ts",
    "client/src/components/mentors/bookingUtils.spec.ts",
    "server/mock-exam-flow.spec.ts",
    "server/telemetry-routes.spec.ts",
  ],
};
