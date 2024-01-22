import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions,
  Alert,
  Linking,
} from "react-native";

import Colors from "../../assets/colors";
import colors from "../../assets/colors";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { Icon } from "@rneui/themed";
import { color } from "@rneui/base";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function QRScannerScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const [isFlashOn, setIsFlashOn] = useState(false);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };

  const onSuccess = (e: any) => {
    // console.log("##Data-received-after-scanning: ", e.data);
    Linking.openURL(e.data).catch((err) =>
      console.error("An error occured", err)
    );
  };
  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={
          isFlashOn
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        containerStyle={{
          backgroundColor: colors.black,
          // position: 'relative',
        }}
        cameraStyle={[styles.cameraStyle]}
        cameraContainerStyle={[styles.cameraContainerStyle]}
        fadeIn={false}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to{' '}
        //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
        //     your computer and scan the QR code.
        //   </Text>
        // }
        bottomContent={
          <View style={[styles.bottomContent]}>
            <Icon
              raised
              name="image"
              type="material"
              color={color.white}
              reverse={true}
              onPress={() =>
                Alert.alert("Information!", "This feature is in-progress")
              }
            />
            <Icon
              raised
              name={isFlashOn ? "flash-on" : "flash-off"}
              type="material"
              color={color.white}
              reverse={true}
              onPress={() => setIsFlashOn((prevValue) => !prevValue)}
            />
          </View>
        }
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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  cameraContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.black,
    marginTop: -200,
  },
  cameraStyle: {
    overflow: "hidden",
    position: "relative",
    height: 250,
    width: 250,
    borderRadius: 20,
  },
  bottomContent: {
    flexDirection: "row",
    marginTop: -200,
    gap: 20,
  },
});
