import React, { useCallback, useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions,
  Alert,
} from "react-native";

import Colors from "../../assets/colors";
import colors from "../../assets/colors";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { Button, Icon } from "@rneui/themed";
import { color } from "@rneui/base";
import { getUserInfoByPhoneNumberAPI } from "../../api/users";
import { routeInfo } from "../../constants/routes";
import { ErrorPopUpModal, PageLoadSpinner } from "../../components";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function QRScannerScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<string>('');

  const onSuccess = (e: any) => {
    setIsLoading(true); // Once You Call the API Action loading will be true
    setErrorInfo("");
    // console.log("##Data-received-after-scanning: ", typeof e.data);
    try {
      const QRCodeData = JSON.parse(e.data);
      if(typeof QRCodeData === 'object' && QRCodeData.phoneNumber){
        getUserInfoByPhoneNumberAPI(QRCodeData.phoneNumber)
        .then( accountInfo => {
          console.log("##accountInfo: ", accountInfo);
          /**
           * TODO: ONCE THE RECEIVER-ACCOUNT IS AVAILABLE, NAVIGATE THE SCREEN TO MAKE-PAYMENT SCREEN
           */
          setIsLoading(false); // Once You Call the API Action loading will be true
          navigation.navigate(routeInfo?.MAKE_QR_CODE_PAYMENT_INFO,  {
            receiverAccountInfo: accountInfo
          });
        })
        .catch(error => {
          console.log('##error: ', error);
          setErrorInfo("Something went wrong reading QR code. please Scan it again")
          setIsLoading(false); // if any error occurs, closing the thing
        })
  
      } else {
        setErrorInfo("It's not a valid QR code");
      }   
    } catch (error) {
      console.log("##error: ", error);
      setErrorInfo("It's not a valid QR code");
    }
  };

  const resetErrorInfo = useCallback(() => {
    setErrorInfo("");
    setIsLoading(false);
  }, []);

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
      <PageLoadSpinner isLoading={isLoading} />
      <ErrorPopUpModal
        isVisible={errorInfo ? true : false}
        errorInfo={errorInfo}
        resetErrorInfo={resetErrorInfo}
      />
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={
          isFlashOn
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        containerStyle={{
          backgroundColor: colors.appThemeColorLight,
          // position: 'relative',
        }}
        cameraStyle={[styles.cameraStyle]}
        cameraContainerStyle={[styles.cameraContainerStyle]}
        fadeIn={false}
        reactivate={true}
        vibrate={true}
        bottomContent={
          <View style={[styles.bottomContent]}>
            <Icon
              raised
              name="image"
              type="material"
              // color={color.white}
              reverse={true}
              onPress={() =>
                Alert.alert("Information!", "This feature is in-progress")
              }
            />
            <Icon
              raised
              name={isFlashOn ? "flash-on" : "flash-off"}
              type="material"
              // color={color.white}
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
    position: "relative",
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
    backgroundColor: colors.appThemeColorLight,
    marginTop: -70,
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
    marginTop: -100,
    gap: 20,
  },
});
