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
  TextInput,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Badge, Icon, Button } from "@rneui/themed";

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, CustomButton, Divider } from "../../components";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { userSingOutAction } from "../../redux/actions";
import { convertIntoCurrency } from "../../utils";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SendMoneyScreen(props: any): React.JSX.Element {
  const currentSymbol = '₹';
  const { navigation, route } = props;
  const { phoneNumber } = props?.route?.params || {};
  console.log("###sendMoney-screen: ", phoneNumber);
  const isDarkMode = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const [wannaSetTxnMessage, setWannaSetTxnMessage] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [txnMessage, setTxnMessage] = useState<string >();
  // const userInfo = useSelector((store: any) => store.user);
  // console.log("##userInfo: ", userInfo);

  const handleTxnMessage = (text: string) => {
    setTxnMessage(text)
  }
  const handleAmountChange = (value: string) => {
    if(!Number.isNaN(Number(value))){
      setAmount(value);     
    }
  }
  const handlePayment = () => {

  }
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
        style={[styles.transactionsList]}
      >
        <View style={styles.photoContainer}>
          <Avatar
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
            size="large"
          />
        </View>
      </ScrollView>
      <View style={[styles.paymentInfo]}>
        <View style={[styles.senderInfoContainer]}>
          <Text style={[styles.label]}>Transferring Money to:</Text>
          <View style={{ alignContent: "center" }}>
            <Text style={[styles.senderName]}>
              Banking Name: Ponna Ramesh
              <Icon
                reverseColor={"blue"}
                iconStyle={{ paddingLeft: 15 }}
                type="material-community"
                name="shield-check"
                color={Colors?.green}
              />
            </Text>
          </View>
        </View>
        {
          !wannaSetTxnMessage ? null : (
            <TextInput
            id="txnMessage"
            style={styles.txnMessageInput}
            placeholder="Message here..."
            inputMode="none"
            onChangeText={handleTxnMessage}
            value={txnMessage}
          />
          )
        }
        <View style={[styles.inputTextboxContainer]}>
          <Icon
            size={20}
            name="inr"
            type="font-awesome"
            color={Colors.white}
          />
          <TextInput
            id="amount"
            style={styles.amountInputBox}
            placeholder="Enter amount here..."
            placeholderTextColor={Colors?.white}
            inputMode="numeric"
            onChangeText={handleAmountChange}
            // onbluer={}
            value={amount}
          />
          <View style={[styles.iconContainer]}>
            <Icon
              size={40}
              onPress={() => setWannaSetTxnMessage(!wannaSetTxnMessage)}
              name="note-text-outline"
              type="material-community"
              color={Colors.white}
            />
            {/* <Icon
              size={40}
              name="send-circle"
              type="material-community"
              onPress={handlePayment}
              color={Colors.white}
              style={styles.sendIcon}
              // disabled={true}
              // disabledStyle={{backgroundColor: "inherit"}}
            /> */}
            <Button
              title="Pay"
              titleStyle={{ color: Colors.appThemeColor, fontWeight: '700', paddingHorizontal: 10, }}
              buttonStyle={{
                backgroundColor: Colors.white,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
            />

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingBottom: 50,
  },
  transactionsList: {
    // backgroundColor: Colors.appThemeColor,
    opacity: 0.1,
  },
  photoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  paymentInfo: {
    // display: "flex",
    // marginBottom: 50,
  },
  senderInfoContainer: {
    backgroundColor: "#eed6fe",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "900",
  },
  senderName: {
    fontWeight: "900",
    textAlignVertical: "center",
  },
  txnMessageInput: {
    fontSize: 16,
  },
  inputTextboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.appThemeColor,
    paddingHorizontal: 5,
  },
  iconContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
  },
  amountInputBox: {
    width: "70%",
    color: Colors.white,
    fontWeight: "900",
    fontSize: 20,
  },
  sendIcon: {},
  transactionMessage: {},
});

