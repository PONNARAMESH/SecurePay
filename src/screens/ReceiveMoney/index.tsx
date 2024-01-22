import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Dimensions,
} from "react-native";

import Colors from "../../assets/colors";
import QRCODE from "../../components/QRCode";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ReceiveMoney(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const [productQRref, setProductQRref] = useState();

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };

  const QRCodeData = {
    displayName: "john",
    mobileNumber: "9876543216",
    amount: 0,
  };

  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <QRCODE
        value={JSON.stringify(QRCodeData)}
        size={250}
        color="black"
        backgroundColor="white"
        getRef={(c) => setProductQRref(c)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
