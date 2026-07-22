module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/tests/e2e/", // Playwright tests
    "\\.spec\\.ts$" // Ignore all .spec.ts files since they are designed for node:test/Playwright
  ],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@shared/(.*)$": "<rootDir>/shared/$1"
  },
  extensionsToTreatAsEsm: [".ts"],
};
