import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { userSingInSuccessAction } from '../../src/redux/actions';
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import HomeScreen from "../screens/HomeScreen";
import AddNewContactScreen from "../screens/AddNewContactScreen";
import { routeInfo } from "../constants/routes";
import { ILoggedInUserInfo } from "../types";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

export type TAuthorizedRouteProps = {
  userInfo: ILoggedInUserInfo
};

export const AuthorizedRoutes = React.memo(function AuthorizedRoutes(props: TAuthorizedRouteProps): React.JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userSingInSuccessAction(props.userInfo));
  }, [])
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen
          name={routeInfo?.HOME_SCREEN}
          component={HomeScreen}
        />
      </Stack.Navigator> */}
      <Tab.Navigator>
      <Tab.Screen name={routeInfo?.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={routeInfo?.ADD_TO_CONTACTS} component={AddNewContactScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
});