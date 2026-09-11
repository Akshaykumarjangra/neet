module.exports = {
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  },
  testPathIgnorePatterns: ['\\.spec\\.ts$']
};
