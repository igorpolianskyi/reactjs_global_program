module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
  '\\.module\\.css$': 'identity-obj-proxy',
  '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  '\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testMatch: [
    "**/?(*.)+(test).[jt]s?(x)"
  ],
};