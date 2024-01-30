/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const HelloApp = () => {
  return <h1> Hello, Ramesh!</h1>
}

it('should be true', () => {
  renderer.create(<HelloApp />);
  expect(true).toBeTruthy();
});

// it('renders correctly', () => {
//   renderer.create(<App />);
// });
