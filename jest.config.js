module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: ['lib/**/*.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/lib/generated'],
};
