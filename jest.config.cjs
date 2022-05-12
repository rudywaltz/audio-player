// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: 'vite-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/test/**/*.js', "!**/__mocks__/*"],
  setupFilesAfterEnv: ["./setup.js"],
  testEnvironment: "@happy-dom/jest-environment",
  "collectCoverageFrom": [
    "src/**/*.js",
    "!src/dist/**"
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
