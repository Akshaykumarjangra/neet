module.exports = { preset: 'ts-jest', testPathIgnorePatterns: ['\\.spec\\.ts$', '/tests/e2e/'], moduleNameMapper: { '^@shared/(.*)$': '<rootDir>/shared/$1' } };
