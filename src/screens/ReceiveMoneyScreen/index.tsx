import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../assets/colors";
import QRCODE from "../../components/QRCode";
import { TRootState } from "../../redux/store";
import { useFetchUserInfoById } from "../../hooks/useFetchUserInfoById";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ReceiveMoneyScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const [productQRref, setProductQRref] = useState();
  const loggedInUserInfo = useSelector(
    (store: TRootState) => store?.user?.data
  );
  const  {userAccountInfo} = useFetchUserInfoById(loggedInUserInfo?.uid || "") || {};
  const { phoneNumber } = userAccountInfo || {};

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };

  const QRCodeData = {
    phoneNumber,
  };

  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <View style={[styles.pageTitleContainer]}>
        <Text style={[styles.pageTitle]}>
          Share this QR Code to receive money from other
        </Text>
      </View>
      <View style={styles.QRCodeContainer}>
        <QRCODE
          value={JSON.stringify(QRCodeData)}
          size={250}
          color="black"
          backgroundColor="white"
          getRef={(c) => setProductQRref(c)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  pageTitleContainer: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  QRCodeContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
});
