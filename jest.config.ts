/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['./src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Modules are meant for code which is repeating in each test file
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    //"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/filesMock.js",
    '^.+\\.svg$': '<rootDir>/tests/mocks/svg.tsx'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  },
  testMatch: ['**/?(*.)(spec|test).[jt]s?(x)'], // Finds test files named like abc.test|spec.ts?tsx|js|jsx in roots:[] prop.
  testEnvironment: 'jsdom' // To avoid of js DOM errors
};
