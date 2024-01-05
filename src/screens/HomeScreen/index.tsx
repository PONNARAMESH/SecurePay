import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Alert,
  // Button,
} from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@rneui/base";

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, CustomButton, Divider } from "../../components";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { userSingOutAction } from "../../redux/actions";
import { useFetchAccountInfo } from "../../hooks";
import { TRootState } from "../../redux/store";
import { ILoggedInUserInfo } from "../../types";
import { Card } from "@rneui/themed";
import { convertIntoCurrent, maskAccountNumber } from "../../utils";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const loggedInUserInfo = useSelector<TRootState>(
    (store) => store?.user?.data
  ) as ILoggedInUserInfo | null;
  const dispatch = useDispatch();
  const accountInfo = useFetchAccountInfo(loggedInUserInfo?.uid || "");
  // console.log("##----accountInfo: ", accountInfo);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle]}
      >
        <View style={styles.imageContainer}>
        </View>
        <View style={styles.flexCenter}>
          <Text style={styles.greetings}>
            Hey, {accountInfo?.displayName || accountInfo?.email}
          </Text>
        </View>
        <View style={styles.flexCenter}>
          <Text style={styles.welcomeMessage}>Welcome to Secure Pay App!!!</Text>
        </View>
        <Card>
          <Card.Title>Here is your Account Info</Card.Title>
          <Card.Divider />
          <View>
            <Text>
              Account Number:{" "}
              {maskAccountNumber(accountInfo?.accountNumber ?? "")}
            </Text>
          </View>
          <View>
            <Text>
              Balance: {convertIntoCurrent(accountInfo?.balance ?? 0)}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 10,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    // // just for testing
    // borderWidth: 2,
    // borderColor: 'red',
    // 'View': {
    //   flex: 1,
    //   flexDirection: "row",
    //   justifyContent: "center",
    // }
  },
  flexCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.appTheamColor,
  },
  greetings: {
    fontSize: 20,
    // fontWeight: "bold",
    color: colors.green,
  },
  welcomeMessage: {
    fontSize: 15,
    // fontWeight: "bold",
    color: colors.green,
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
});
