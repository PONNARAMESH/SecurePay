import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  SectionList,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TouchableScale from "react-native-touchable-scale";
import LinearGradient from "react-native-linear-gradient";

import Colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { Avatar, FAB, Icon, ListItem } from "@rneui/themed";
import {
  groupTheContactsBasedOnAlphabeticalOrder,
  isUrlValid,
} from "../../utils";
import { TRootState } from "../../redux/store";
import { ILoggedInUserInfo } from "../../types";
import { useFetchUserInfoById } from "../../hooks";
import { getAllMyContactsRequestAction } from "../../redux/actions/contacts";
import { IContactsReducer } from "../../redux/reducers";
import { PageLoadSpinner } from "../../components";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ContactsScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();

  const loggedInUserInfo = useSelector<TRootState>(
    (store) => store?.user?.data
  ) as ILoggedInUserInfo | null;
  const { myContacts, isFetchingMyContacts } = useSelector<TRootState>(
    (store) => store.contacts
  ) as IContactsReducer;

  const {
    userAccountInfo: accountInfo,
    isFetchingAccountInfo,
  } = useFetchUserInfoById(loggedInUserInfo?.uid || "");
  // console.log("##----accountInfo: ", accountInfo);

  useEffect(() => {
    dispatch(getAllMyContactsRequestAction(accountInfo?.phoneNumber as string));
  }, [accountInfo?.contactsList]);

  // console.log("##contactsInfo: ", {myContacts, isFetchingMyContacts})

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };

  const onRefresh = () => {
    dispatch(getAllMyContactsRequestAction(accountInfo?.phoneNumber as string));
  };

  const groupedContactsInfo = groupTheContactsBasedOnAlphabeticalOrder(
    myContacts || []
  );
  // console.log("##groupedContactsInfo: ",groupedContactsInfo)
  if (!myContacts?.length) {
    return (
      <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={Colors.appThemeColor}
        />
        <PageLoadSpinner
          isLoading={isFetchingAccountInfo || isFetchingMyContacts}
        />
        <View style={[styles.emptyContainer]}>
          <Icon
            name="account-search"
            type="material-community"
            size={60}
            color={Colors.gray}
            testID="iconForEmptyContactsList"
          />
          <Text
            style={[styles.emptyMessage]}
            testID="messageForEmptyContactsList"
          >
            Sorry! You don't have any contacts!!
          </Text>
        </View>
        <FAB
          testID="addNewContactButton"
          icon={{
            name: "person-add-alt-1",
            type: "material",
            size: 26,
            color: "white",
          }}
          onPress={() => {
            // Alert.alert("This feature is In-Progress!");
            navigation.navigate(routeInfo?.ADD_NEW_CONTACT);
          }}
          color={Colors.blue}
          style={{
            borderWidth: 0,
            position: "absolute",
            bottom: 60,
            right: 10,
          }}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      {/* <ActivityIndicator
        animating={isFetchingMyContacts}
        style={[styles.pageLoadingIndicator]}
        size="large"
        color={Colors.greenMedium} 
      /> */}
      <SectionList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // sections={DATA}
        sections={Object.keys(groupedContactsInfo).map((key) => ({
          title: key,
          data: groupedContactsInfo[key],
        }))}
        keyExtractor={(item, index) => item?.phoneNumber + index}
        renderItem={({ item, index, section }) => (
          <ListItem
            testID={`listItem_${section.title}_${index}`}
            bottomDivider
            Component={TouchableScale}
            friction={90}
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            containerStyle={[
              styles.contactInfoContainer,
              {
                marginHorizontal: 16,
                marginVertical: 8,
                borderRadius: 8,
              },
            ]}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [Colors.appThemeColor, Colors.white],
              start: { x: 0, y: 0 },
              end: { x: 2, y: 0 },
            }}
            onPress={() => {
              navigation.navigate(routeInfo.SEND_MONEY, {
                receiverInfo: { ...item },
              });
            }}
          >
            {isUrlValid(item?.profilePic || "") ? (
              <Avatar rounded source={{ uri: item?.profilePic }} />
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
            <ListItem.Content>
              <ListItem.Title style={[styles.ItemTitle]}>
                {item?.displayName}
              </ListItem.Title>
              <ListItem.Subtitle style={[styles.ItemSubTitle]}>
                {item?.email}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={[styles.ItemSubTitle]}>
                {item?.phoneNumber}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={40} color={Colors?.white} />
          </ListItem>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header} testID={`section_${title}`}>
            {title}
          </Text>
        )}
      />
      <FAB
        testID="addNewContactButton"
        icon={{
          name: "person-add-alt-1",
          type: "material",
          size: 26,
          color: "white",
        }}
        onPress={() => {
          navigation.navigate(routeInfo?.ADD_NEW_CONTACT);
        }}
        color={Colors.blue}
        style={{
          borderWidth: 0,
          position: "absolute",
          bottom: 60,
          right: 10,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: 10,
    paddingBottom: 50,
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
  pageLoadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 5,
  },
  header: {
    fontSize: 20,
    paddingLeft: 20,
    // backgroundColor: "#fff",
  },
  contactInfoContainer: {
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 3,
    shadowOpacity: 0.9,
    // rowGap: 10,
  },
  ItemTitle: {
    color: Colors?.white,
    fontSize: 18,
  },
  ItemSubTitle: {
    color: Colors?.white,
    fontSize: 16,
  },
});
