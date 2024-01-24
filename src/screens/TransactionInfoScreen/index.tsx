import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../assets/colors";
import QRCODE from "../../components/QRCode";
import { TRootState } from "../../redux/store";
import { useFetchUserInfoById } from "../../hooks/useFetchUserInfoById";
import {
  convertIntoCurrency,
  isItOutgoingTransaction,
  isUrlValid,
  maskAccountNumber,
} from "../../utils";
import { useFetchUserInfoByPhoneNumber } from "../../hooks";
import { Avatar, Icon, ListItem } from "@rneui/themed";
import { mashreqBankLogo } from "../../assets/images";
import { ITransactionInfo, IUserAccountInfo } from "../../types";
import { getTransactionInfoByTxnId } from "../../api/transactions";
import { getUserInfoByPhoneNumberAPI } from "../../api/users";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TransactionInfoScreen(props: any): React.JSX.Element {
  const { navigation } = props;
  const { transactionId } = props?.route?.params || {};
  const isDarkMode = useColorScheme() === "dark";
  const [expanded, setExpanded] = React.useState<boolean>(true);
  const [transactionInfo, setTransactionInfo] = React.useState<ITransactionInfo | null>(null);
  const [receiverAccountInfo, setReceiverAccountInfo] = React.useState<IUserAccountInfo | null>(null);

  const loggedInUserInfo = useSelector(
    (store: TRootState) => store?.user?.data
  );

  // const receiverAccountInfo = useFetchUserInfoByPhoneNumber(
  //   transactionInfo?.receiver || ""
  // );
  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };

  useEffect(() => {
    getTransactionInfoByTxnId(transactionId)
    .then(async (txnInfo) => {
      const userAccountInfo = await getUserInfoByPhoneNumberAPI(txnInfo?.receiver as string);
      return {
        txnInfo,
        userAccountInfo,
      }
    })
    .then(res => {
      // console.log("$$$res: ", JSON.stringify(res, null, 4))
      setTransactionInfo(res.txnInfo);
      setReceiverAccountInfo(res.userAccountInfo);
    })
    .catch(error => {
      console.log("##error: ", error);
    })
  }, [transactionId])

  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <View style={[styles.transactionInfoContainer]}>
        <Text style={[styles?.paidToText]}> Paid to</Text>
        <View style={[styles.receiverInfoContainer]}>
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
              containerStyle={{ backgroundColor: "#c2c2c2",  }}
            />
          )}
          <Text style={styles.receiverNameContainer}>
            {receiverAccountInfo?.displayName}
          </Text>
          <Text style={styles.amount}>
            {convertIntoCurrency(Number(transactionInfo?.amount || 0), true)}
          </Text>
        </View>
        <ListItem.Accordion
          content={
            <ListItem.Content>
              <ListItem.Title style={styles.accordionTitleContainer}>
                <View style={[styles.accordionTitleInnerContainer]}>
                  <Icon name="profile" type="ant-design" color="grey" />
                  <Text style={[styles.accordionTitleText]}>
                    Transfer Details
                  </Text>
                </View>
              </ListItem.Title>
            </ListItem.Content>
          }
          isExpanded={expanded}
          topDivider={true}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <View style={[styles.sectionContainer]}>
            <Text style={[styles.sectionLabel]}>Transaction Id</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={[styles.sectionValue]}>
                {transactionInfo?.id}
              </Text>
              <Icon name="copy1" type="ant-design" color={Colors.appThemeColor}/>
            </View>
          </View>
          <View style={[styles.sectionContainer]}>
            <Text style={[styles.sectionLabel]}>Date & Time</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={[styles.sectionValue]}>
                {new Date(transactionInfo?.createdAt || '').toLocaleString()}
              </Text>
              {/* <Icon name="copy1" type="ant-design" color={Colors.appThemeColor}/> */}
            </View>
          </View>
          <View style={[styles.sectionContainer]}>
            <Text style={[styles.sectionLabel]}>
              {isItOutgoingTransaction(
                loggedInUserInfo?.phoneNumber as string,
                transactionInfo?.sender as string
              )
                ? "Debited From"
                : "Credited To"}
            </Text>
            <View style={[styles.bankAccountInfoContainer]}>
              <View style={[styles.iconContainer]}>
                <Avatar
                  rounded
                  source={mashreqBankLogo}
                  containerStyle={{
                    borderWidth: 1,
                    borderColor: Colors?.appThemeColor,
                  }}
                />
              </View>
              <View style={[styles.accountInfoContainer]}>
                <Text style={[styles.maskedAccountNumber]}>
                  {maskAccountNumber(receiverAccountInfo?.accountNumber || "")
                    .match(/.{1,4}/g)
                    ?.join(" ")}
                </Text>
                {/* <Text styles={[styles.UTRNumber]}></Text> */}
              </View>
              <View style={[styles.amountInfoContainer]}>
                <View>
                  <Text style={styles.amount}>
                    {convertIntoCurrency(
                      Number(transactionInfo?.amount || 0),
                      true
                    )}
                  </Text>
                </View>
                {/* <View style={{ alignItems: "flex-end"}}>
                  <Icon name="copy1" type="ant-design" color="grey" />
                </View> */}
              </View>
            </View>
          </View>
        </ListItem.Accordion>
        <View style={[styles.buttonsContainer]}>
          <View style={[styles.button]}>
            <Avatar
              icon={{
                name: "arrow-up-right",
                type: "feather",
                size: 26,
                color: Colors.white,
              }}
              containerStyle={{ backgroundColor: Colors.appThemeColor, borderRadius: 10, }}
            />
            <Text style={[styles.buttonLabel]}>Send Again</Text>
          </View>
          <View style={[styles.button]}>
            <Avatar
              icon={{
                name: "arrow-swap",
                type: "fontisto",
                size: 26,
                color: Colors.white,
              }}
              containerStyle={{ backgroundColor: Colors.appThemeColor, borderRadius: 10, }}
            />
            <Text style={[styles.buttonLabel]}>View History</Text>
          </View>
          <View style={[styles.button]}>
            <Avatar
              icon={{
                name: "sharealt",
                type: "antdesign",
                size: 26,
                color: Colors.white,
              }}
              containerStyle={{ backgroundColor: Colors.appThemeColor, borderRadius: 10, }}
            />
            <Text style={[styles.buttonLabel]}>Share Receipt</Text>
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
  },
  transactionInfoContainer: {
    margin: 10,
    marginVertical: 20,
    padding: 10,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    rowGap: 20,
  },
  paidToText: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.black,
  },
  receiverInfoContainer: {
    flexDirection: "row",
    gap: 10,
  },
  receiverNameContainer: {
    fontSize: 20,
    fontWeight: "900",
    position: "relative",
    color: Colors.black,
  },
  amount: {
    fontSize: 20,
    fontWeight: "900",
    position: "absolute",
    right: 0,
    color: Colors.black,
  },
  accordionTitleContainer: {
    marginLeft: -15,
  },
  accordionTitleInnerContainer: {
    flexDirection: "row",
    gap: 10,
  },
  accordionTitleText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionContainer: {
    rowGap: 10,
    marginBottom: 30,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionValue: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  bankAccountInfoContainer: {
    flexDirection: "row",
    height: "auto",
  },
  iconContainer: {
  },
  accountInfoContainer: {
    width: "60%",
    rowGap: 20,
    paddingHorizontal: 10,
  },
  maskedAccountNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: Colors.black,
  },
  amountInfoContainer: {
    width: "30%",
    rowGap: 40,
    fontSize: 20,
    fontWeight: "900",
    color: Colors.black,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
    paddingTop: 10,
  },
  button: {
    alignItems: "center",
    flexDirection: "column",
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.appThemeColor
  },
});
