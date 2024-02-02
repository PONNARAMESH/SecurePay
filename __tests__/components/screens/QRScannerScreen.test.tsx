import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import QRScannerScreen from "../../../src/screens/QRScannerScreen";
// import Camera from '../../../__mocks__/Camera';

jest.mock("react-native-camera", () => {
  return {
    RNCamera: {
      Constants: {
        FlashMode: {
          torch: "torch",
          off: "off",
          on: "on",
          auto: "auto",
        },
      },
    },
  };
});

// jest.mock("@react-native-firebase/app", () => {
//   return {
//     app: jest.fn(),
//     apps: [],
//     auth: jest.fn(),
//     firestore: jest.fn(),
//     initializeApp: jest.fn(),
//     utils: jest.fn(),
//   };
// });

// jest.mock("@react-native-firebase/auth", () => ({
//   firebase: {
//     auth: () => ({
//       signInWithCredential: jest.fn(),
//       signInWithEmailAndPassword: jest.fn(),
//       createUserWithEmailAndPassword: jest.fn(),
//       signOut: jest.fn(),
//     }),
//   },
//   GoogleAuthProvider: {
//     credential: jest.fn(),
//   },
// }));

jest.mock("react-native-qrcode-scanner", () => {
  const React = require("react");
  const PropTypes = require("prop-types");

  return class MockQRCodeScanner extends React.Component {
    static propTypes: any = { children: PropTypes.any };
    static defaultProps: any = { reactivate: false };

    render() {
      return React.createElement(
        "react-native-qrcode-scanner",
        this.props,
        this.props.children
      );
    }
  };
});

describe("QRScannerScreen-testing", () => {
  test("It should render successfully", () => {
    render(<QRScannerScreen navigation={{ navigate: jest.fn() }} />);
  });
});
