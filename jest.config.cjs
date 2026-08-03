module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  },
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { useESM: true }]
  },
  testPathIgnorePatterns: ['\\.spec\\.ts$'] // ignore node:test files for jest
};
