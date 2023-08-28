module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  transformIgnorePatterns: ['/node_modules/(?!(.+))'],
  testMatch: ["**/*spec.(ts|tsx)"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer", "jest-serializer-html"],
  testResultsProcessor: "jest-sonar-reporter",
  collectCoverageFrom: [
    "src/**/*.tsx",
    "src/**/*.ts",
    "!**/index.*",
    "!**/*.d.ts",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  moduleNameMapper: {
    "^@app/(.*)": "<rootDir>/src/app/$1",
    "^@lib/(.*)": "<rootDir>/src/lib/$1",
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(svg)$": "<rootDir>/__mocks__/svgMock.js",
  },
};
