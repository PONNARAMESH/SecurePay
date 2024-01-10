import React from "react";
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
  Button,
  SectionList,
  TouchableOpacity,
} from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from "react-native-linear-gradient"; // Only if no expo

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, CustomButton, Divider } from "../../components";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { userSingOutAction } from "../../redux/actions";
import { Avatar, FAB, Icon, ListItem } from "@rneui/themed";
import { isUrlValid } from "../../utils";
import { TRootState } from "../../redux/store";
import { NavigationState } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DATA = [
  {
    title: "A",
    data: [
      {
        displayName: "Aaron",
        email: "Aaron@gmail.com",
        accountNumber: "671890342783459",
        phoneNumber: "9876543210",
        profilePic: "http://test.web.com/users/<email_id>",
      },
      {
        displayName: "Andrew",
        email: "Andrew@gmail.com",
        accountNumber: "671890342783460",
        phoneNumber: "9876543211",
        profilePic: "https://randomuser.me/api/portraits/men/36.jpg",
      },
    ],
  },
  {
    title: "B",
    data: [
      {
        displayName: "Benjamin",
        email: "Benjamin@gmail.com",
        accountNumber: "671890342783459",
        phoneNumber: "9876543210",
        profilePic: "http://test.web.com/users/<email_id>",
      },
      {
        displayName: "Brandon",
        email: "Brandon@gmail.com",
        accountNumber: "671890342783460",
        phoneNumber: "9876543211",
        profilePic: "https://randomuser.me/api/portraits/men/36.jpg",
      },
    ],
  },
  {
    title: "B",
    data: [
      {
        displayName: "Benjamin",
        email: "Benjamin@gmail.com",
        accountNumber: "671890342783459",
        phoneNumber: "9876543210",
        profilePic: "http://test.web.com/users/<email_id>",
      },
      {
        displayName: "Brandon",
        email: "Brandon@gmail.com",
        accountNumber: "671890342783460",
        phoneNumber: "9876543211",
        profilePic: "https://randomuser.me/api/portraits/men/36.jpg",
      },
    ],
  },
  {
    title: "B",
    data: [
      {
        displayName: "Benjamin",
        email: "Benjamin@gmail.com",
        accountNumber: "671890342783459",
        phoneNumber: "9876543210",
        profilePic: "http://test.web.com/users/<email_id>",
      },
      {
        displayName: "Brandon",
        email: "Brandon@gmail.com",
        accountNumber: "671890342783460",
        phoneNumber: "9876543211",
        profilePic: "https://randomuser.me/api/portraits/men/36.jpg",
      },
    ],
  },
  {
    title: "B",
    data: [
      {
        displayName: "Benjamin",
        email: "Benjamin@gmail.com",
        accountNumber: "671890342783459",
        phoneNumber: "9876543210",
        profilePic: "http://test.web.com/users/<email_id>",
      },
      {
        displayName: "Brandon",
        email: "Brandon@gmail.com",
        accountNumber: "671890342783460",
        phoneNumber: "9876543211",
        profilePic: "https://randomuser.me/api/portraits/men/36.jpg",
      },
    ],
  },
];

export default function ContactsScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const userInfo = useSelector((store: TRootState) => store?.user?.data);
  // console.log("##userInfo: ", userInfo);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.phoneNumber + index}
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            Component={TouchableScale}
            friction={90}
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            containerStyle={{
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 8,
            }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [Colors.appThemeColor, "white"],
              start: {x: 0, y: 0},
              end: {x: 2, y: 0},
            }}
            onPress={() => {
              navigation.navigate(routeInfo.SEND_MONEY, {phoneNumber: item.phoneNumber})
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
              <ListItem.Title style={[styles.ItemTitle]}>{item.displayName}</ListItem.Title>
              <ListItem.Subtitle style={[styles.ItemSubTitle]}>{item.email}</ListItem.Subtitle>
              <ListItem.Subtitle style={[styles.ItemSubTitle]}>{item.phoneNumber}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={40} color={Colors?.white} />
          </ListItem>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <FAB
        icon={{
          name: "person-add-alt-1",
          type: "material",
          size: 26,
          color: "white",
        }}
        onPress={() => {
          Alert.alert("This feature is In-Progress!");
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
  header: {
    fontSize: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
  ItemTitle:{
    color: Colors?.white,
    fontSize: 18,
  },
  ItemSubTitle: {
    color: Colors?.white,
    fontSize: 16,
  }
});
