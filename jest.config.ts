module.exports = async () => {
  return {
    roots: ['<rootDir>'],
    preset: 'ts-jest',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: [
      'node_modules',
      'interfaces',
      '<rootDir>/src/index.ts',
      '.mock.ts',
    ],
    coverageDirectory: '<rootDir>/coverage/',
    logHeapUsage: true,
    testEnvironment: 'node',
    resetMocks: true,
    maxWorkers: '50%',
    maxConcurrency: 10,
    reporters: ['default'],
  };
};
