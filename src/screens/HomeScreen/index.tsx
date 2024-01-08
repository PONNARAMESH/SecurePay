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
    backgroundColor: "white",
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
        <View style={styles.imageContainer}></View>
        <View style={styles.flexCenter}>
          <Text style={styles.greetings}>
            Hey, {accountInfo?.displayName || accountInfo?.email}
          </Text>
        </View>
        <View style={styles.flexCenter}>
          <Text style={styles.welcomeMessage}>
            Welcome to Secure Pay App!!!
          </Text>
        </View>
        <Card containerStyle={[styles.card, styles.elevation]}>
          <Card.Title style={styles.heading}>
            Here is your Account Info
          </Card.Title>
          <Card.Divider />
          <View>
            <Text style={[styles.heading, styles.textHighlighter]}>
              Account Number:{" "}
              {maskAccountNumber(accountInfo?.accountNumber ?? "")}
            </Text>
          </View>
          <View>
            <Text style={[styles.heading, styles.textHighlighter]}>
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
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  flexCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.appThemeColor,
  },
  greetings: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.appThemeColor,
  },
  welcomeMessage: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.appThemeColor,
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
    color: "#fcf1eb",
  },
  card: {
    // backgroundColor: '#33dc76',
    backgroundColor: "#DC7633",
    opacity: 0.9,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  elevation: {
    // shadowColor: '#52006A',
    elevation: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textHighlighter: {
    color: "#fcf1eb",
  },
});
