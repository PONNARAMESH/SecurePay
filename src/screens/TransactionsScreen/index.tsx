import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native";
import { Avatar, Image, ListItem } from "@rneui/themed";
import TouchableScale from "react-native-touchable-scale";

import { convertIntoCurrency, isUrlValid, mashPhoneNumber } from "../../utils";
import Colors from "../../assets/colors";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { mashreqBankLogo } from "../../assets/images";
import { TRootState } from "../../redux/store";
import { useFetchUserInfoById } from "../../hooks";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TransactionsScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const loggedInUserInfo = useSelector(
    (store: TRootState) => store?.user?.data
  );
  const accountInfo = useFetchUserInfoById(loggedInUserInfo?.uid || "");
  // const { phoneNumber } = loggedInUserInfo || {};
  console.log("##userInfo: ", accountInfo);
  const DATA = [
    {
      id: "T202401063254023839",
      sender: accountInfo?.phoneNumber || '',
      receiver: "8876543210",
      amount: "500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023840",
      title: "Second Item",
      sender: "8876543200",
      receiver: accountInfo?.phoneNumber || '',
      amount: "1500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023841",
      title: "Third Item",
      sender: "7676543210",
      receiver: accountInfo?.phoneNumber || '',
      amount: "1000.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023842",
      sender: accountInfo?.phoneNumber || '',
      receiver: "8876543233",
      amount: "500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023843",
      title: "Second Item",
      sender: accountInfo?.phoneNumber || '',
      receiver: "9876543210",
      amount: "1500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023844",
      title: "Third Item",
      sender: accountInfo?.phoneNumber || '',
      receiver: "8876543432",
      amount: "1000.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023845",
      sender: "9876543210",
      receiver: accountInfo?.phoneNumber || '',
      amount: "500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023846",
      title: "Second Item",
      sender: "777654324",
      receiver: accountInfo?.phoneNumber || '',
      amount: "1500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023847",
      title: "Third Item",
      sender: "9876543277",
      receiver: accountInfo?.phoneNumber || '',
      amount: "1000.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023848",
      sender: "9876543219",
      receiver: accountInfo?.phoneNumber || '',
      amount: "500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023849",
      title: "Second Item",
      sender: "8876543287",
      receiver: accountInfo?.phoneNumber || '',
      amount: "1500.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
    {
      id: "T202401063254023850",
      title: "Third Item",
      sender: accountInfo?.phoneNumber || '',
      receiver: "887654354",
      amount: "1000.23",
      txnMessage: "give amount",
      txnType: "walletToWallet",
      createdAt: "2024-01-10T06:55:54.914Z",
    },
  ];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  const isPaymentReceived = (paymentSenderPhoneNumber: string): boolean => {
    return accountInfo?.phoneNumber !== paymentSenderPhoneNumber
      ? true
      : false;
  };

  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.listItemContainer]}>
            <View style={[styles.row1]}>
              <View style={[styles.txnTypeIconContainer]}>
                <Avatar
                  size={32}
                  rounded
                  icon={{
                    name: "arrow-up",
                    type: "fontisto",
                    color: Colors.appThemeColor,
                  }}
                  iconStyle={{
                    transform: isPaymentReceived(item.sender as string)
                      ? "rotate(-135deg)"
                      : "rotate(45deg)",
                  }}
                  containerStyle={{ backgroundColor: Colors.white }}
                />
              </View>
              <View style={[styles.targetUserInfo]}>
                <Text style={styles.label}>
                  {isPaymentReceived(item.sender as string)
                    ? "Received from"
                    : "Transferred to"}
                </Text>
                <Text style={styles.receiverPhoneNumber}>
                  {mashPhoneNumber(
                    (isPaymentReceived(item.sender as string) ? item.sender : item.receiver) as string
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
                {new Date().toLocaleDateString()}
              </Text>
              <View style={[styles.sourceAccountInfoContainer]}>
                <Text style={[styles.transferType]}>
                  {isPaymentReceived(item.sender as string)
                    ? "Credited to"
                    : "Debited from"}
                </Text>
                <Avatar
                  size={32}
                  rounded
                  source={mashreqBankLogo}
                  containerStyle={{ backgroundColor: Colors.white }}
                />
              </View>
            </View>
          </View>
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
  listItemContainer: {
    marginVertical: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.appThemeColor,
    // backgroundColor: "#fafcfa",
  },
  row1: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  txnTypeIconContainer: {
    width: "10%",
  },
  targetUserInfo: {
    width: "40%",
  },
  label: {
    fontWeight: "800",
    fontSize: 18,
    color: Colors.white,
  },
  receiverPhoneNumber: {
    color: Colors.white,
  },
  amountContainer: {
    // width: "40%",
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  amount: {
    fontWeight: "800",
    fontSize: 18,
    color: Colors.white,
  },
  row2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cratedAt: {
    color: Colors.white,
  },
  sourceAccountInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  transferType: {
    color: Colors.white,
  },
  bankLogo: {
    width: 50,
    height: 50,
  },
});
