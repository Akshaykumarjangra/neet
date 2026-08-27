module.exports = {
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  },
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { useESM: true }]
  },
  testPathIgnorePatterns: ['\\.spec\\.ts$']
};