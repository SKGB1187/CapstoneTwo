module.exports = {
    testMatch: ["<rootDir>/tests/**/*.test.js"],
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx", "json", "node"],
  };