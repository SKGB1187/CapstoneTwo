module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest", // Transform .js, .jsx, .ts, and .tsx files
    },
    moduleFileExtensions: ["js", "jsx", "json", "node"], // Recognize JSX files
  };