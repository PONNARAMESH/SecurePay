import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  StatusBar,
} from "react-native";

import Colors from "../../assets/colors";
import { Button, Icon } from "@rneui/themed";
import { convertIntoCurrency } from "../../utils";
import { useFetchUserInfoByPhoneNumber } from "../../hooks";
import { ITransactionInfo } from "../../types";
import { routeInfo } from "../../constants/routes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function PaymentStatusScreen(props: any): React.JSX.Element {
  const { navigation } = props;
  const { transactionInfo }: { transactionInfo: ITransactionInfo } =
    props?.route?.params || {};
  // console.log("##--------transactionInfo: ", transactionInfo);
  const isDarkMode = useColorScheme() === "dark";
  const receiverAccountInfo = useFetchUserInfoByPhoneNumber(
    transactionInfo?.receiver || ""
  );
  // console.log("##receiverAccountInfo: ", receiverAccountInfo);

  const handleViewTransactionInfo = () => {
    navigation.navigate(routeInfo?.TRANSACTIONS_INFO,  {
      transactionId: transactionInfo?.id,
    });
  }

  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.greenMedium}
      />
      <View style={[styles.contentContainer]}>
        <View style={[styles.iconContainer]}>
          <Icon
            raised
            size={40}
            name={"check"}
            // type="ant-design"
            type="font-awesome"
            color={Colors.green}
          />
        </View>
        <View style={[styles.paymentDescription]}>
          <Text style={[styles.paymentDescription]}>
            Payment of {convertIntoCurrency(Number(transactionInfo?.amount || 0), true)} to{" "}
            {receiverAccountInfo?.displayName || "-"} is Successful
          </Text>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button
            color={Colors.greenLight}
            style={styles.viewDetailsButton}
            buttonStyle={{
              borderColor: 'white',
              borderWidth: 1,
              borderRadius: 30,
            }}
            onPress={handleViewTransactionInfo}
          >
            view details
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Colors.greenMedium,
  },
  contentContainer: {
    marginTop: 100,
    rowGap: 30,
    flexDirection: "column",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  paymentDescription: {
    flexDirection: "row",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: 20,
    textAlign: "center",
    color: Colors.white,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  viewDetailsButton: {
    backgroundColor: Colors.greenMedium,
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 30,
  },
});
