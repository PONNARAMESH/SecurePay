import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";

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
import { View, Text, StyleSheet } from "react-native";
import QRScannerScreen from "../screens/QRScannerScreen";
import PaymentStatusScreen from "../screens/PaymentStatusScreen";
import TransactionInfoScreen from "../screens/TransactionInfoScreen";
import MakeQRCodePaymentScreen from "../screens/MakeQRCodePaymentScreen";
import AddNewContactScreen from "../screens/AddNewContactScreen/inded";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getCustomHeaderOptions = (navigation: any, dispatch: any) => {
  return {
    headerTitleStyle: { color: colors.white },
    headerBackground: () => <View style={styles.headerBackground}></View>,
    headerTintColor: colors.white,
    // headerTitle: (props) => <Text {...props} >{props.children}</Text>,
    // headerLeft: (props) => <Icon {...props} color={"orange"} name="arrow-back" type="IonIcons" />,
    headerBackgroundContainerStyle: {
      backgroundColor: colors.appThemeColor,
    },
    headerStyle: {
      backgroundColor: colors.appThemeColor,
    },
    headerRight: (props: any) => {
      return (
        <View style={[styles.headerRight, { paddingRight: 15 }]}>
          <Icon
            {...props}
            color={colors.white}
            name="qrcode"
            type="antdesign"
            onPress={() => {
              navigation.navigate(routeInfo?.QR_SCANNER);
            }}
          />
          <Icon
            {...props}
            color={colors.white}
            name="power-off"
            type="font-awesome"
            onPress={() => dispatch(userSingOutAction())}
          />
        </View>
      );
    },
  };
};
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

function LandingScreen(): React.JSX.Element {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator
      initialRouteName={routeInfo?.HOME_SCREEN}
      screenOptions={({ route, navigation }) => ({
        ...getCustomHeaderOptions(navigation, dispatch),
        tabBarInactiveBackgroundColor: colors.white,
        tabBarActiveTintColor: colors.white,
        tabBarActiveBackgroundColor: colors.appThemeColor,
        tabBarInactiveTintColor: colors.appThemeColor,
        tabBarStyle: {
          // backgroundColor: colors.appThemeColor,
          // position: "absolute",
          // borderTopWidth: 0,
          shadowColor: colors.red,
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          // elevation: 24,
        },
        unmountOnBlur: true, // This right here will mount the component and reset your screen
      })}
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
            <Icon {...props} name="person-add-alt-1" type="MaterialIcons" />
          ),
        }}
      />
      <Tab.Screen
        name={routeInfo?.TRANSACTIONS}
        component={TransactionsScreen}
        options={{
          tabBarIcon: (props) => (
            <Icon {...props} name="bank-transfer" type="material-community" />
          ),
        }}
      />
      <Tab.Screen
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
      />
    </Tab.Navigator>
  );
}
export const AuthorizedRoutes = React.memo(function AuthorizedRoutes(
  props: TAuthorizedRouteProps
): React.JSX.Element {
  // const [activeScreeName, setActiveScreeName] = useState(routeInfo?.HOME_SCREEN || '');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userSingInSuccessAction(props.userInfo));
  }, []);
  const { userInfo } = props;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={routeInfo?.LANDING_SCREEN}
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={({ route, navigation }) => ({
            ...getCustomHeaderOptions(navigation, dispatch),
          })}
          name={routeInfo?.SEND_MONEY}
          component={SendMoneyScreen}
        />
        <Stack.Screen
          options={({ route, navigation }) => ({
            ...getCustomHeaderOptions(navigation, dispatch),
          })}
          name={routeInfo?.QR_SCANNER}
          component={QRScannerScreen}
        />
        <Stack.Screen
          options={({ route, navigation }) => {
            return {
              headerTitleStyle: { color: colors.white },
              headerTintColor: colors.white,
              headerStyle: {
                backgroundColor: colors.greenMedium,
              },
            };
          }}
          name={routeInfo?.PAYMENT_STATUS}
          component={PaymentStatusScreen}
        />
        <Stack.Screen
          options={({ route, navigation }) => ({
            ...getCustomHeaderOptions(navigation, dispatch),
          })}
          name={routeInfo?.TRANSACTIONS_INFO}
          component={TransactionInfoScreen}
        />
        <Stack.Screen
          options={({ route, navigation }) => ({
            ...getCustomHeaderOptions(navigation, dispatch),
          })}
          name={routeInfo?.MAKE_QR_CODE_PAYMENT_INFO}
          component={MakeQRCodePaymentScreen}
        />
        <Stack.Screen
          options={({ route, navigation }) => {
            const {headerRight, ...resetOptions} = getCustomHeaderOptions(navigation, dispatch);
            return resetOptions
          }}
          name={routeInfo?.ADD_NEW_CONTACT}
          component={AddNewContactScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const styles = StyleSheet.create({
  headerBackground: {
    shadowColor: "orange",
  },
  headerRight: {
    flexDirection: "row",
    gap: 40,
  },
});
