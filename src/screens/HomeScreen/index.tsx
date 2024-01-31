import React, { useState } from "react";
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
  Modal,
  ActivityIndicator,
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
import { useFetchUserInfoById } from "../../hooks";
import { TRootState } from "../../redux/store";
import { ILoggedInUserInfo } from "../../types";
import { Card, Switch } from "@rneui/themed";
import { convertIntoCurrency, maskAccountNumber } from "../../utils";

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
  const {userAccountInfo: accountInfo, isFetchingAccountInfo} = useFetchUserInfoById(loggedInUserInfo?.uid || "");
  // console.log("##----accountInfo: ", accountInfo);
  const [
    doYouWannaMaskSensitiveInfo,
    setDoYouWannaMaskSensitiveInfo,
  ] = useState(false);

  const toggleSwitch = () => {
    setDoYouWannaMaskSensitiveInfo(!doYouWannaMaskSensitiveInfo);
  };

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };

  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <Modal
        transparent={true}
        animationType={"none"}
        visible={isFetchingAccountInfo}
        style={{ zIndex: 1100 }}
        // onRequestClose={() => {
        //   setIsLoading(false);
        // }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={isFetchingAccountInfo}
              size={50}
              color={Colors.appThemeColor}
            />
          </View>
        </View>
      </Modal>
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
          <Card.Divider width={1} color={colors?.white} insetType="middle" />
          <View>
            <Text style={[styles.heading, styles.textHighlighter]}>
              Account Number:{" "}
              {(doYouWannaMaskSensitiveInfo
                ? accountInfo?.accountNumber || ""
                : maskAccountNumber(accountInfo?.accountNumber ?? "")
              )
                .match(/.{1,4}/g)
                ?.join(" ")}
            </Text>
          </View>
          <View>
            <Text style={[styles.heading, styles.textHighlighter]}>
              Balance: {convertIntoCurrency(accountInfo?.balance ?? 0, true)}
            </Text>
          </View>
          <View style={styles.sensitiveInfoSwitch}>
            <Text
              style={[
                styles.heading,
                styles.textHighlighter,
                styles.switchHelperText,
              ]}
            >
              show sensitive info{" "}
            </Text>
            <Switch
              // style={{borderColor: "black", borderWidth: 12, alignSelf: "flex-start"}}
              value={doYouWannaMaskSensitiveInfo}
              onValueChange={toggleSwitch}
            />
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
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 13,
    color: "#fcf1eb",
  },
  card: {
    // backgroundColor: '#33dc76',
    backgroundColor: "#DC7633",
    opacity: 0.8,
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
  switchHelperText: {
    fontSize: 14,
  },
  sensitiveInfoSwitch: {
    marginTop: 10,
    marginBottom: -5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
