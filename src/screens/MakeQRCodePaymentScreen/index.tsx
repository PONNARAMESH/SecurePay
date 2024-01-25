import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { TRootState } from "../../redux/store";
import { convertIntoCurrency, isUrlValid } from "../../utils";
import { EnumTransactionStatusValues, IUserAccountInfo } from "../../types";
import { Avatar, Button, Dialog, Input } from "@rneui/themed";
import { useFetchUserInfoById } from "../../hooks";
import {
  makeNewTransactionRequestAction,
  resetTransactionInfoByIdAction,
} from "../../redux/actions/transactions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MakeQRCodePaymentScreen(props: any): React.JSX.Element {
  const { navigation } = props;
  const { receiverAccountInfo }: { receiverAccountInfo: IUserAccountInfo } =
    props?.route?.params || {};
  const isDarkMode = useColorScheme() === "dark";
  const dispatch = useDispatch();

  const paymentsData = useSelector((store: TRootState) => store?.payments);
  const loggedInUserInfo = useSelector(
    (store: TRootState) => store?.user?.data
  );
  // console.log("##loggedInUserInfo: ", loggedInUserInfo);
  const accountInfo = useFetchUserInfoById(
    loggedInUserInfo?.uid || ""
  );
  // console.log("##accountInfo: ", accountInfo);

  const [amount, setAmount] = useState<string>("");
  const [txnMessage, setTxnMessage] = useState<string>();
  const [showErrorPopUp, setShowErrorPopUp] = useState<boolean>(false);

  useEffect(() => {
    if (
      [
        EnumTransactionStatusValues.TTxnSuccess,
        // EnumTransactionStatusValues.TTxnFailed,
      ].includes(paymentsData?.paymentStatus as any)
    ) {
      // console.log("###paymentsData: ", paymentsData);
      navigation.navigate(routeInfo.PAYMENT_STATUS, {
        transactionInfo: paymentsData.transactionInfo,
      });
      setAmount("");
      setTxnMessage("");
      return;
    }
    setShowErrorPopUp(true);
    return () => {
      dispatch(resetTransactionInfoByIdAction());
    };
  }, [paymentsData?.paymentStatus]);

  const handleAmountChange = (value: string) => {
    value = value.replaceAll(",", "");
    if (!Number.isNaN(Number(value))) {
      setAmount(value);
    }
  };
  const handleTxnMessage = (text: string) => {
    setTxnMessage(text);
  };

  const handlePayment = () => {
    if (Number(amount) > Number(accountInfo?.balance)) {
      Alert.alert("Error!", "Insufficient balance :(");
      return;
    }
    const payload = {
      sender: accountInfo?.phoneNumber as string,
      receiver: receiverAccountInfo?.phoneNumber as string,
      amount: amount,
      txnMessage: txnMessage || "",
      txnType: "WalletToWallet",
    };
    // console.log("##data: ", payload);
    dispatch(makeNewTransactionRequestAction(payload));
  };

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };

  const toggleDialogShowErrorPopUp = () => {
    setShowErrorPopUp(!showErrorPopUp);
  };
  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <View style={[styles.cardContainer]}>
        {paymentsData.paymentStatus ===
          EnumTransactionStatusValues.TTxnFailed && (
          <Dialog
            isVisible={showErrorPopUp}
            onBackdropPress={toggleDialogShowErrorPopUp}
            style={{ backgroundColor: "red" }}
            overlayStyle={{ backgroundColor: "red" }}
          >
            <Dialog.Title title="Dialog Title" />
            <Text>Something went wrong! Please try again.</Text>
            <Button
              title="try again"
              onPress={toggleDialogShowErrorPopUp}
              // buttonStyle={styles.button}
            />
          </Dialog>
        )}
        <View style={[styles.userInfoContainer]}>
          {isUrlValid(receiverAccountInfo?.photoURL || "") ? (
            <Avatar
              rounded
              source={{ uri: receiverAccountInfo?.photoURL || undefined }}
            />
          ) : (
            <Avatar
              rounded
              icon={{
                name: "person-outline",
                type: "material",
                size: 26,
                color: Colors.black,
              }}
              containerStyle={{ backgroundColor: "#c2c2c2" }}
            />
          )}
          <View style={[styles.userNameContainer]}>
            <Text style={[styles.actualUserName]}>
              {receiverAccountInfo?.displayName}
            </Text>
            <Text style={styles.userNameAsPerBanking}>
              {receiverAccountInfo?.phoneNumber}
            </Text>
            {/* <Text style={[styles.userNameAsPerBanking]}></Text> */}
          </View>
        </View>
        <Input
          placeholder="Enter amount here"
          leftIcon={{
            type: "font-awesome",
            name: "inr",
            // color: Colors.appThemeColor,
          }}
          inputContainerStyle={[styles.inputContainerStyle]}
          inputStyle={[styles.amount]}
          onChangeText={handleAmountChange}
          value={amount ? convertIntoCurrency(Number(amount)) : ""}
          keyboardType="numeric"
        />
        <Input
          placeholder="Add a message (optional)"
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={[styles.message]}
          onChangeText={handleTxnMessage}
        />
      </View>
      <View style={[styles.proceedButtonContainer]}>
        <Button
          title="PROCEED TO PAY"
          buttonStyle={{
            backgroundColor: Colors.appThemeColor,
          }}
          size="lg"
          titleStyle={{ fontWeight: "bold", fontSize: 20 }}
          disabled={amount ? false : true}
          disabledStyle={[styles.disabledButton]}
          disabledTitleStyle={{ color: "white" }}
          onPress={handlePayment}
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
  cardContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  userInfoContainer: {
    margin: 10,
    marginBottom: 20,
    flexDirection: "row",
    gap: 20,
  },
  userNameContainer: {},
  actualUserName: {
    fontWeight: "900",
    fontSize: 18,
  },
  userNameAsPerBanking: {},
  amount: {
    fontWeight: "900",
    fontSize: 20,
    // color: Colors.appThemeColor,
  },
  message: {
    // color: Colors.appThemeColor,
  },
  inputContainerStyle: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  proceedButtonContainer: {
    marginTop: "auto",
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
});
