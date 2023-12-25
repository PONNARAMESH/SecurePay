import React from "react";


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import HomeScreen from "../screens/HomeScreen";
import { routeInfo } from "../constants/routes";

const Stack = createNativeStackNavigator();

export function UnAuthorizedRoutes(): React.JSX.Element {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name={routeInfo?.LOG_IN}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routeInfo?.SIGN_UP}
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export function AuthorizedRoutes(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name={routeInfo?.HOME_SCREEN}
          component={LoginScreen}
        /> */}
        <Stack.Screen
          name={routeInfo?.HOME_SCREEN}
          component={HomeScreen}
        />
        {/* <Stack.Screen name={routeInfo?.SIGN_UP} component={SignUpScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};