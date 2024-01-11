import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TextInput,
  SectionList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Badge, Icon, Button } from "@rneui/themed";

import Colors from "../../assets/colors";
import {
  convertIntoCurrency,
  isItOutgoingTransaction,
  isUrlValid,
} from "../../utils";
import { TRootState } from "../../redux/store";
import { useFetchUserInfoById } from "../../hooks";
import { EnumTransactionStatusValues, ITransactionInfo } from "../../types";
import TouchableScale from "react-native-touchable-scale";
import { Divider } from "@rneui/base";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SendMoneyScreen(props: any): React.JSX.Element {
  const currentSymbol = "₹";
  const { navigation, route } = props;
  const { phoneNumber } = props?.route?.params || {};
  // console.log("###sendMoney-screen: ", phoneNumber);
  const isDarkMode = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const [wannaSetTxnMessage, setWannaSetTxnMessage] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [txnMessage, setTxnMessage] = useState<string>();
  const loggedInUserInfo = useSelector(
    (store: TRootState) => store?.user?.data
  );
  const accountInfo = useFetchUserInfoById(loggedInUserInfo?.uid || "");
  // console.log("##userInfo: ", loggedInUserInfo);
  const DATA = [
    {
      id: "T202401063254023839",
      sender: accountInfo?.phoneNumber || "",
      receiver: "8876543210",
      amount: "500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      txnStatus: "Success",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023840",
      sender: "8876543200",
      receiver: accountInfo?.phoneNumber || "",
      amount: "1500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      txnStatus: "Failed",
      createdAt: "2024-01-11T06:55:54.914Z",
    },
    {
      id: "T202401063254023841",
      sender: "7676543210",
      receiver: accountInfo?.phoneNumber || "",
      amount: "1000.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      txnStatus: "Pending",
      createdAt: "2024-01-11T06:55:54.914Z",
    },
    {
      id: "T202401063254023839",
      sender: accountInfo?.phoneNumber || "",
      receiver: "8876543210",
      amount: "500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      txnStatus: "Success",
      createdAt: "2024-01-11T06:55:54.914Z",
    },
    {
      id: "T202401063254023840",
      sender: "8876543200",
      receiver: accountInfo?.phoneNumber || "",
      amount: "1500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      txnStatus: "Failed",
      createdAt: "2024-01-12T06:55:54.914Z",
    },
    {
      id: "T202401063254023841",
      sender: "7676543210",
      receiver: accountInfo?.phoneNumber || "",
      amount: "1000.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      txnStatus: "Pending",
      createdAt: "2024-01-12T06:55:54.914Z",
    },
    {
      id: "T202401063254023839",
      sender: accountInfo?.phoneNumber || "",
      receiver: "8876543210",
      amount: "500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      txnStatus: "Success",
      createdAt: "2024-01-12T06:55:54.914Z",
    },
    {
      id: "T202401063254023840",
      sender: "8876543200",
      receiver: accountInfo?.phoneNumber || "",
      amount: "1500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      txnStatus: "Failed",
      createdAt: "2024-01-13T06:55:54.914Z",
    },
    {
      id: "T202401063254023841",
      sender: "7676543210",
      receiver: accountInfo?.phoneNumber || "",
      amount: "1000.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      txnStatus: "Pending",
      createdAt: "2024-01-13T06:55:54.914Z",
    },
  ];

  const groupedTransactions = groupTheTransactionsBasedOnDate(
    (DATA || []) as ITransactionInfo[]
  );

  function groupTheTransactionsBasedOnDate(txnArray: ITransactionInfo[]) {
    const newObj: Record<string, ITransactionInfo[]> = {};
    for (let txn of txnArray) {
      let day = new Date(txn.createdAt).toLocaleString();
      if (newObj[day]) {
        newObj[day].push(txn);
      } else {
        newObj[day] = [];
        newObj[day].push(txn);
      }
    }
    return newObj;
  }

  const handleTxnMessage = (text: string) => {
    setTxnMessage(text);
  };
  const handleAmountChange = (value: string) => {
    value = value.replaceAll(",", "");
    if (!Number.isNaN(Number(value))) {
      setAmount(value);
    }
  };
  const handlePayment = () => {
    console.log("##newTxnInfo: ", { amount, txnMessage });
  };

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };
  function getStatusIcon(txnStatus: string): React.ReactNode {
    // throw new Error("Function not implemented.");
    switch (txnStatus) {
      case EnumTransactionStatusValues.TTxnSuccess:
        return (
          <Icon name="checkcircleo" type="antdesign" color={Colors.green} />
        );
      case EnumTransactionStatusValues.TTxnFailed:
        return <Icon name="closecircleo" type="antdesign" color={Colors.red} />;
      case EnumTransactionStatusValues.TTxnPending:
        return (
          <Icon
            name="exclamationcircleo"
            type="antdesign"
            color={Colors.orange}
          />
        );
      default:
        return (
          <Icon name="questioncircleo" type="antdesign" color={Colors.blue} />
        );
    }
  }

  function getStatusMessage(
    txnStatus: EnumTransactionStatusValues
  ): React.ReactNode {
    // throw new Error("Function not implemented.");
    switch (txnStatus) {
      case EnumTransactionStatusValues.TTxnSuccess:
        return "Sent Securely";
      case EnumTransactionStatusValues.TTxnFailed:
        return "Failed";
      case EnumTransactionStatusValues.TTxnPending:
        return "Pending";
      case EnumTransactionStatusValues.TTxnSuccess:
        return "Unknown";
    }
  }

  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <View style={[styles.subHeader]}>
        {isUrlValid(accountInfo?.photoURL || "") ? (
          <Avatar rounded source={{ uri: accountInfo?.photoURL || "" }} />
        ) : (
          <Avatar
            rounded
            icon={{
              name: "person-outline",
              type: "material",
              size: 26,
            }}
            containerStyle={{ backgroundColor: "#c2c2c2" }}
          />
        )}
        <View>
          <Text style={styles.receiverName}>{accountInfo?.displayName}</Text>
          <Text style={styles.receiverPhoneNumber}>{accountInfo?.phoneNumber}</Text>
        </View>
      </View>
      <SectionList
        sections={Object.keys(groupedTransactions).map((key) => ({
          title: key,
          data: groupedTransactions[key],
        }))}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <TouchableScale
            style={[
              styles.chatMessageBox,
              {
                alignSelf: isItOutgoingTransaction(
                  accountInfo?.phoneNumber as string,
                  item.sender as string
                )
                  ? "flex-start"
                  : "flex-end",
              },
            ]}
            // onPress={props.onPress}
            activeScale={0.95}
            friction={50}
            tension={100}
          >
            <Text style={styles.amountContainer}>
              {convertIntoCurrency(Number(item.amount), true)}
            </Text>
            <Text
              style={[styles.txnMessageContainer, { maxWidth: "100%" }]}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item.txnMessage || ""}
            </Text>
            <Divider color="black" />
            <View style={[styles.txnStatusContainer]}>
              {getStatusIcon(item.txnStatus)}
              <Text style={[styles.txnStatus]}>
                {getStatusMessage(item.txnStatus)}
              </Text>
              <View style={styles.rightArrowIcon}>
                <Icon name="right" type="antdesign" color={Colors.gray} />
              </View>
            </View>
          </TouchableScale>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <View style={[styles.paymentInfo]}>
        <View style={[styles.receiverInfoContainer]}>
          <Text style={[styles.label]}>Transferring Money to:</Text>
          <View style={styles.nameInfo}>
            <Text style={[styles.receiverNameContainer]}>
              Banking Name:{"  "}
            </Text>
            <Text
              style={[styles.receiverName, { maxWidth: "50%" }]}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {accountInfo?.displayName || "--"}
            </Text>
            <Icon
              iconStyle={{ paddingLeft: 15 }}
              type="material-community"
              name="shield-check"
              color={Colors?.greenMedium}
            />
          </View>
        </View>
        {!wannaSetTxnMessage ? null : (
          <TextInput
            id="txnMessage"
            style={styles.txnMessageInput}
            placeholder="Message here..."
            inputMode="none"
            onChangeText={handleTxnMessage}
            value={txnMessage}
          />
        )}
        <View style={[styles.inputTextboxContainer]}>
          <Icon size={20} name="inr" type="font-awesome" color={Colors.white} />
          <TextInput
            id="amount"
            style={styles.amountInputBox}
            placeholder="Enter amount here..."
            placeholderTextColor={Colors?.white}
            inputMode="numeric"
            onChangeText={handleAmountChange}
            value={amount ? convertIntoCurrency(Number(amount)) : ""}
          />
          <View
            style={[styles.iconContainer, { width: amount ? "30%" : "auto" }]}
          >
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
            {!amount ? (
              <View />
            ) : (
              <Button
                title="Pay"
                titleStyle={{
                  color: Colors.appThemeColor,
                  fontWeight: "700",
                  paddingHorizontal: 10,
                }}
                buttonStyle={{
                  backgroundColor: Colors.white,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                onPress={handlePayment}
              />
            )}
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
  subHeader: {
    backgroundColor: Colors.appThemeColorMedium,
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  receiverPhoneNumber: {

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
  receiverInfoContainer: {
    backgroundColor: Colors?.appThemeColorMedium,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "900",
  },
  nameInfo: {
    flexDirection: "row",
  },
  receiverNameContainer: {
    textAlignVertical: "center",
  },
  receiverName: {
    fontWeight: "900",
    textAlignVertical: "center",
    textTransform: "uppercase",
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
  header: {
    textAlign: "center",
    width: "auto",
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  chatMessageBox: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.white,
    // backgroundColor: Colors.appThemeColor,
    borderRadius: 20,
    width: "80%",

    elevation: 5,
    shadowColor: Colors.red,
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    rowGap: 10,
  },
  amountContainer: {
    fontWeight: "900",
    fontSize: 20,
    color: Colors.appThemeColor,
  },
  txnMessageContainer: {
    fontSize: 14,
  },
  txnStatusContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },
  txnStatusIcon: {},
  txnStatus: {
    fontSize: 16,
  },
  rightArrowIcon: {
    marginLeft: "auto",
  },
});
