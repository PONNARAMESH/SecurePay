import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import TouchableScale from "react-native-touchable-scale";

import {
  convertIntoCurrency,
  isItOutgoingTransaction,
  isUrlValid,
  mashPhoneNumber,
} from "../../utils";
import Colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { mashreqBankLogo } from "../../assets/images";
import { TRootState } from "../../redux/store";
import { useFetchUserInfoById } from "../../hooks";
import { EnumTransactionStatusValues, ITransactionInfo } from "../../types";
import {
  getMyTransactionsRequestAction,
  getTransactionsInfoByIdRequestAction,
} from "../../redux/actions/transactions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TransactionsScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const dispatch = useDispatch();

  const { loggedInUserInfo, transactionsInfo } = useSelector(
    (store: TRootState) => ({
      loggedInUserInfo: store?.user?.data,
      transactionsInfo: store?.payments,
    })
  );

  const {
    userAccountInfo: accountInfo,
    isFetchingAccountInfo,
  } = useFetchUserInfoById(loggedInUserInfo?.uid || "");
  // const { phoneNumber } = loggedInUserInfo || {};
  // console.log("##userInfo: ", accountInfo);
  // console.log("##transactions: ", transactionsInfo.transactions);

  useEffect(() => {
    dispatch(
      getMyTransactionsRequestAction(accountInfo?.phoneNumber as string)
    );
  }, [accountInfo?.phoneNumber]);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };

  function getStatusIcon(txnStatus: string): React.ReactNode {
    // throw new Error("Function not implemented.");
    switch (txnStatus) {
      case EnumTransactionStatusValues.TTxnSuccess:
        return (
          // <Icon name="checkcircleo" type="antdesign" color={Colors.green} />
          <Avatar
            size={32}
            rounded
            source={mashreqBankLogo}
            containerStyle={{ backgroundColor: Colors.white }}
          />
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

  // If There is no data to show, displaying proper message
  if (!transactionsInfo?.transactions?.length) {
    return (
      <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={Colors.appThemeColor}
        />
        <View style={[styles.emptyContainer]}>
          <Icon
            name="account-search"
            type="material-community"
            size={60}
            color={Colors.gray}
          />
          <Text style={[styles.emptyMessage]}>
            Sorry! You don't have any transactions!!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  function getTextBasedOnTxnStatus(
    txnStatus: string,
    sender: string,
    loggedInUserPhoneNumber: string
  ): string | undefined {
    // throw new Error("Function not implemented.");
    switch (txnStatus) {
      case EnumTransactionStatusValues.TTxnSuccess:
        return isItOutgoingTransaction(
          loggedInUserPhoneNumber,
          sender as string
        )
          ? "Debited from"
          : "Credited to";
      case EnumTransactionStatusValues.TTxnFailed:
        return "Failed!";
      case EnumTransactionStatusValues.TTxnPending:
        return "Pending!";
      case EnumTransactionStatusValues.TTxnInitiated:
        return "Initiated";
    }
  }

  const onPress = (transactionId: string) => {
    navigation.navigate(routeInfo.TRANSACTIONS_INFO, {
      transactionId,
    });
  };

  const sortedTransactionsData = (
    [...transactionsInfo?.transactions] || []
  ).sort(
    (a: ITransactionInfo, b: ITransactionInfo) =>
      new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  );

  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <Modal
        transparent={true}
        animationType={"none"}
        visible={
          isFetchingAccountInfo || transactionsInfo?.isFetchingTransactionsInfo
        }
        style={{ zIndex: 1100 }}
        // onRequestClose={() => {
        //   setIsLoading(false);
        // }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={
                isFetchingAccountInfo ||
                transactionsInfo?.isFetchingTransactionsInfo
              }
              size={50}
              color={Colors.appThemeColor}
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={sortedTransactionsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableScale
            style={[styles.listItemContainer]}
            onPress={() => onPress(item.id)}
            activeScale={0.95}
            friction={50}
            tension={100}
          >
            {/* <View style={[styles.listItemContainer]}> */}
            <View style={[styles.row1]}>
              <View style={[styles.txnTypeIconContainer]}>
                <Avatar
                  size={50}
                  rounded
                  icon={{
                    name: "arrow-up-circle",
                    type: "material-community",
                    color: Colors.green,
                  }}
                  iconStyle={{
                    transform: isItOutgoingTransaction(
                      accountInfo?.phoneNumber as string,
                      item.sender as string
                    )
                      ? "rotate(45deg)"
                      : "rotate(-135deg)",
                  }}
                  containerStyle={{ backgroundColor: Colors.white }}
                />
              </View>
              <View style={[styles.targetUserInfo]}>
                <Text style={styles.label}>
                  {isItOutgoingTransaction(
                    accountInfo?.phoneNumber as string,
                    item.sender as string
                  )
                    ? "Transferred to"
                    : "Received from"}
                </Text>
                <Text style={styles.receiverPhoneNumber}>
                  {mashPhoneNumber(
                    (isItOutgoingTransaction(
                      accountInfo?.phoneNumber as string,
                      item.sender as string
                    )
                      ? item.receiver
                      : item.sender) as string
                  )}
                </Text>
              </View>
              <View style={[styles.amountContainer]}>
                <Text style={[styles.amount]}>
                  {convertIntoCurrency(Number(item.amount) || 0, true)}
                </Text>
              </View>
            </View>
            <View style={[styles.row2]}>
              <Text style={[styles.cratedAt]}>
                {new Date(item?.createdAt || null).toLocaleDateString()}
              </Text>
              <View style={[styles.sourceAccountInfoContainer]}>
                <Text style={[styles.transferType]}>
                  {getTextBasedOnTxnStatus(
                    item.txnStatus,
                    item.sender,
                    accountInfo?.phoneNumber as string
                  )}
                </Text>
                {getStatusIcon(item.txnStatus)}
              </View>
            </View>
            {/* </View> */}
          </TouchableScale>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    padding: 10,
    paddingBottom: 40,
    gap: 10,
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
  emptyContainer: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emptyMessage: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.gray,
  },
  listItemContainer: {
    marginVertical: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
    // backgroundColor: "#fafcfa",
  },
  row1: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  txnTypeIconContainer: {
    // width: "10%",
  },
  targetUserInfo: {
    width: "40%",
  },
  label: {
    fontWeight: "800",
    fontSize: 18,
    // color: Colors.white,
  },
  receiverPhoneNumber: {
    // color: Colors.white,
  },
  amountContainer: {
    // width: "40%",
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  amount: {
    fontWeight: "800",
    fontSize: 18,
    color: Colors.appThemeColor,
  },
  row2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cratedAt: {
    // color: Colors.white,
  },
  sourceAccountInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  transferType: {
    // color: Colors.white,
  },
  bankLogo: {
    width: 50,
    height: 50,
  },
});
