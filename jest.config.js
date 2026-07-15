export default {
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testMatch: [
    '**/tests/unit/**/*.spec.ts',
    '**/client/**/*.test.ts',
    '**/client/**/*.test.tsx'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/e2e/',
    '/server/',
    '/client/'
  ]
};
