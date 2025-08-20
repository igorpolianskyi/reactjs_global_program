module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy'
  },
  testMatch: [
    "**/?(*.)+(test).[jt]s?(x)"
  ],
};