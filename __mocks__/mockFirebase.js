jest.mock("@react-native-firebase/app", () => {
  return {
    app: jest.fn(),
    apps: [],
    auth: jest.fn(),
    firestore: jest.fn(),
    initializeApp: jest.fn(),
    utils: jest.fn(),
  };
});

jest.mock("@react-native-firebase/auth", () => ({
  firebase: {
    auth: () => ({
      signInWithCredential: jest.fn(),
      signInWithEmailAndPassword: jest.fn(),
      createUserWithEmailAndPassword: jest.fn(),
      signOut: jest.fn(),
    }),
  },
  GoogleAuthProvider: {
    credential: jest.fn(),
  },
}));

