module.exports = { preset: 'ts-jest', extensionsToTreatAsEsm: ['.ts', '.tsx'], transform: { '^.+\\.[tj]sx?$': ['ts-jest', { useESM: true }] }, testPathIgnorePatterns: ['\\.spec\\.ts$'] };
