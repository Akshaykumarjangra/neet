module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  },
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { useESM: true }]
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testPathIgnorePatterns: ['\\.spec\\.ts$']
};
