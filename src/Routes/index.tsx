import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Image } from "@rneui/themed";

import {
  userSingInSuccessAction,
  userSingOutAction,
} from "../../src/redux/actions";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import HomeScreen from "../screens/HomeScreen";
import ContactsScreen from "../screens/ContactsScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import SendMoneyScreen from "../screens/SendMoneyScreen";
import ReceiveMoneyScreen from "../screens/ReceiveMoneyScreen";
import { mashreqBankLogo } from "../assets/images";

import { routeInfo } from "../constants/routes";
import { ILoggedInUserInfo } from "../types";
import colors from "../assets/colors";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function UnAuthorizedRoutes(): React.JSX.Element {
  return (
    <NavigationContainer>
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
}

export type TAuthorizedRouteProps = {
  userInfo: ILoggedInUserInfo;
};

export const AuthorizedRoutes = React.memo(function AuthorizedRoutes(
  props: TAuthorizedRouteProps
): React.JSX.Element {
  // const [activeScreeName, setActiveScreeName] = useState(routeInfo?.HOME_SCREEN || '');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userSingInSuccessAction(props.userInfo));
  }, []);
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen
          name={routeInfo?.SEND_MONEY}
          component={SendMoneyScreen}
        />
      </Stack.Navigator> */}
      <Tab.Navigator
        initialRouteName={routeInfo?.HOME_SCREEN}
        screenOptions={{
          // headerShown: false,
          // header: props => <Text {...props}>{props.route.name} </Text>,
          headerTitleStyle: { color: colors.white },
          headerBackground: (props) => (
            <View style={{ shadowColor: "orange" }}></View>
          ),
          headerBackgroundContainerStyle: {
            backgroundColor: colors.appThemeColor,
            // box-shadow: 10px 10px 5px lightblue inset,
            shadowOffset: {width: -2, height: 4},  
            shadowColor: '#171717',  
            shadowOpacity: 0.2,  
            shadowRadius: 3,  
            opacity: 0.8,
          },
          // headerTitle: (props) => <Text style={{color: props.tintColor}}>{props.children}  <Image style={{width: 30, height: 30}} source={mashreqBankLogo} /></Text>,
          // headerLeft: (props) => <Icon {...props} color={"orange"} name="arrow-back" type="IonIcons" />,
          headerRight: (props) => {
            return (
              <Icon
                {...props}
                color={colors.white}
                name="power-off"
                type="font-awesome"
                onPress={() => dispatch(userSingOutAction())}
              />
            );
          },
          tabBarInactiveBackgroundColor: colors.white,
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.appThemeColor,
          tabBarStyle: {
            height: 40,
            paddingTop: 0,
            // backgroundColor: "rgba(227, 225, 225,1)",
            backgroundColor: colors.appThemeColor,
            position: "absolute",
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name={routeInfo?.HOME_SCREEN}
          component={HomeScreen}
          options={{
            tabBarIcon: (props) => (
              <Icon {...props} name="home" type="simpleLineIcons" />
            ),
          }}
        />
        <Tab.Screen
          name={routeInfo?.CONTACTS}
          component={ContactsScreen}
          options={{
            tabBarIcon: (props) => (
              <Icon
                {...props}
                name="person-add-alt-1"
                type="MaterialIcons"
                // color={"orange"}
              />
            ),
          }}
        />
        <Tab.Screen
          name={routeInfo?.SEND_MONEY}
          component={SendMoneyScreen}
          options={{
            tabBarIcon: (props) => (
              <Icon
                {...props}
                name="bank-transfer-out"
                type="material-community"
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name={routeInfo?.RECEIVE_MONEY}
          component={ReceiveMoneyScreen}
          options={{
            tabBarIcon: (props) => (
              <Icon
                {...props}
                name="bank-transfer-in"
                type="material-community"
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name={routeInfo?.TRANSACTIONS}
          component={TransactionsScreen}
          options={{
            tabBarIcon: (props) => (
              <Icon {...props} name="bank-transfer" type="material-community" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
});
