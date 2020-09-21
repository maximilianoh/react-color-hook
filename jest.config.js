module.exports = {
  rootDir: "./",
  roots: ["<rootDir>/src"],
  verbose: false,
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.jsx|.js?$": "babel-jest",
  },
  globals: {
    NODE_ENV: "test",
  },
  moduleFileExtensions: ["js", "jsx"],
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  setupFiles: ["jest-canvas-mock"]
  
};
