module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^/public/(.*)$': '<rootDir>/public/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json', 'svg'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.svg$': 'jest-transform-stub'
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transformIgnorePatterns : [
    'node_modules/(?!vue|vee-validate)',
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.vue',
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  modulePathIgnorePatterns: ['.jest-test-results.json'],
}
