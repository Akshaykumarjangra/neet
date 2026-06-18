module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/e2e/",
    "/server/telemetry-routes.spec.ts"
  ],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { "useESM": true }]
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  }
};
