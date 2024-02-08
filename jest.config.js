module.exports = {
  preset: 'react-native',
  // "transform": {
  //   "^.+\\.js$": "babel-jest"
  // },
  // "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(js|ts|tsx)$",
  // "moduleFileExtensions": ["js", "ts", "tsx", "json"],
  // // transform: {
  // //   "\\.[jt]sx?$": "babel-jest"
  // // },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(@react-native-community|react-navigation|@unimodules/.*|native-base|react-native-qrcode-scanner)",
    "jest-runner",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.maestro/", "@react-native"],
  setupFilesAfterEnv: [ "./__mocks__/mockFirebase", "./setupFilesAfterEnv.js",],
  // setupTestFrameworkScriptFile: "./__mocks__/mockFirebase",
};
