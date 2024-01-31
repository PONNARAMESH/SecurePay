import 'react-native';
import React from 'react';
import App from '../App';

/**
 * As App component is utilizing the Firebase & Redux-modules, we have to mock them up here
 * 
 */

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

import {render, screen} from "@testing-library/react-native";

const HelloApp = () => {
  return <h1 testID="title">Hello, Ramesh!</h1>
}

it('should be true', () => {
  render(<HelloApp />);
  expect(screen.getByTestId("title")).toBeVisible();
  // expect(screen.getByTestId("title").children).toBe('Hello, Ramesh!');
});

it('title should be Hello, Ramesh!', () => {
  render(<HelloApp />);
  expect(screen.getByTestId("title").children).toMatchObject(['Hello, Ramesh!']);
});

// it('renders correctly', () => {
//   // un-connect this test-case, once you mock it's dependencies(Firebase & Redux)
//   render(<App />);
// });
