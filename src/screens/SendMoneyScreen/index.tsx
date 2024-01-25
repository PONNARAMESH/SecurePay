import React, { useEffect, useState } from "react";
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
  Alert,
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
import {
  useFetchUserInfoById,
  useFetchUserInfoByPhoneNumber,
} from "../../hooks";
import { EnumTransactionStatusValues, ITransactionInfo } from "../../types";
import TouchableScale from "react-native-touchable-scale";
import { Divider } from "@rneui/base";
import { useGetMutualTransactions } from "../../hooks/useGetMutualTransactions";
import {
  makeNewTransactionRequestAction,
  resetTransactionInfoByIdAction,
} from "../../redux/actions/transactions";
import { routeInfo } from "../../constants/routes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SendMoneyScreen(props: any): React.JSX.Element {
  const currentSymbol = "₹";
  const { navigation, route } = props;
  const { receiverInfo } = props?.route?.params || {};
  // console.log("###sendMoney-screen: ", receiverInfo);
  const isDarkMode = useColorScheme() === "dark";
  const paymentsData = useSelector((store: TRootState) => store?.payments);
  // console.log("##paymentsData: ", paymentsData);
  const dispatch = useDispatch();
  const [wannaSetTxnMessage, setWannaSetTxnMessage] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [txnMessage, setTxnMessage] = useState<string>();
  const loggedInUserInfo = useSelector(
    (store: TRootState) => store?.user?.data
  );
  const accountInfo = useFetchUserInfoById(loggedInUserInfo?.uid || "");
  const receiverAccountInfo = useFetchUserInfoByPhoneNumber(
    receiverInfo?.phoneNumber || ""
  );
  // console.log("##receiverAccountInfo: ", receiverAccountInfo);
  const {
    isFetchingMutualTransactions,
    getMutualTransactionAPICall,
    mutualTransactions,
  } = useGetMutualTransactions();

  useEffect(() => {
    getMutualTransactionAPICall({
      senderPhoneNumber: accountInfo?.phoneNumber as string,
      receiverPhoneNumber: receiverInfo?.phoneNumber,
    });
    return () => {};
  }, [
    accountInfo?.phoneNumber,
    receiverInfo?.phoneNumber,
    paymentsData?.paymentStatus,
  ]);

  useEffect(() => {
    if (
      [
        EnumTransactionStatusValues.TTxnSuccess,
        EnumTransactionStatusValues.TTxnFailed,
      ].includes(paymentsData?.paymentStatus as any)
    ) {
      getMutualTransactionAPICall({
        senderPhoneNumber: accountInfo?.phoneNumber as string,
        receiverPhoneNumber: receiverInfo?.phoneNumber,
      });
      navigation.navigate(routeInfo.PAYMENT_STATUS, {
        transactionInfo: paymentsData.transactionInfo,
      });
      setWannaSetTxnMessage(false);
      setAmount("");
      setTxnMessage("");
    }
    return () => {
      dispatch(resetTransactionInfoByIdAction());
    };
  }, [paymentsData?.paymentStatus]);
  // console.log("##userInfo: ", loggedInUserInfo);
  // console.log("##mutualTransactions: ", mutualTransactions);

  const groupedTransactions = groupTheTransactionsBasedOnDate(
    (mutualTransactions || []) as ITransactionInfo[]
  );

  function groupTheTransactionsBasedOnDate(txnArray: ITransactionInfo[]) {
    const newObj: Record<string, ITransactionInfo[]> = {};
    // checking for null / undefined / empty-array cases
    if (!txnArray || !txnArray.length) {
      return newObj;
    }

    // sort the transactions
    txnArray.sort(
      (a, b) =>
        new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
    );

    // and them grouping the transactions by Date
    for (let txn of txnArray) {
      let day = new Date(txn.createdAt).toDateString();
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
    // console.log("##newTxnInfo: ", { amount, txnMessage });
    // console.log("##accountInfo: ", accountInfo);
    if (Number(amount) > Number(accountInfo?.balance)) {
      Alert.alert("Error!", "Insufficient balance :(");
      return;
    }
    const payload = {
      sender: accountInfo?.phoneNumber as string,
      receiver: receiverInfo?.phoneNumber,
      amount: amount,
      txnMessage: txnMessage || "",
      txnType: "WalletToWallet",
    };
    dispatch(makeNewTransactionRequestAction(payload));
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

  const onPress = (transactionId: string) => {
    navigation.navigate(routeInfo.TRANSACTIONS_INFO, {
      transactionId,
    });
  };

  if (!receiverAccountInfo) {
    return (
      <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={Colors.appThemeColor}
        />
        <View style={[styles.subHeader]}>
          {isUrlValid(receiverInfo?.photoURL || "") ? (
            <Avatar rounded source={{ uri: receiverInfo?.photoURL || "" }} />
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
            <Text style={styles.receiverName}>{receiverInfo?.displayName}</Text>
            <Text style={styles.receiverPhoneNumber}>
              {receiverInfo?.phoneNumber}
            </Text>
          </View>
        </View>
        <View style={[styles.emptyContainer]}>
          <Icon
            name="account-search"
            type="material-community"
            size={60}
            color={Colors.gray}
          />
          <Text style={[styles.noAccountErrorMessage]}>
            Sorry! You can't make any payments to this person as this person
            don't have a Wallet/account number on this Phone number.
          </Text> 
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <View style={[styles.subHeader]}>
        {isUrlValid(receiverInfo?.photoURL || "") ? (
          <Avatar rounded source={{ uri: receiverInfo?.photoURL || "" }} />
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
          <Text style={styles.receiverName}>{receiverInfo?.displayName}</Text>
          <Text style={styles.receiverPhoneNumber}>
            {receiverInfo?.phoneNumber}
          </Text>
        </View>
      </View>
      {!mutualTransactions?.length ? (
        <View style={[styles.emptyContainer]}>
          <Icon
            name="account-search"
            type="material-community"
            size={60}
            color={Colors.gray}
          />
          <Text style={[styles.emptyMessage]}>
            Sorry! There are no mutual transactions as of now!!
          </Text>
        </View>
      ) : (
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
              onPress={() => onPress(item.id)}
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
      )}
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
              {receiverInfo?.displayName || "--"}
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
    // paddingBottom: 50,
  },
  emptyContainer: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  noAccountErrorMessage: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.gray,
    gap: 10,
  },
  emptyMessage: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.gray,
  },
  subHeader: {
    backgroundColor: Colors.appThemeColorMedium,
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  receiverPhoneNumber: {},
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
  },
  amountContainer: {
    fontWeight: "900",
    fontSize: 20,
    color: Colors.appThemeColor,
  },
  txnMessageContainer: {
    fontSize: 14,
    margin: 5,
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
