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

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, CustomButton, Divider } from "../../components";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { userSingOutAction } from "../../redux/actions";
import { Avatar, ListItem } from "@rneui/themed";
import { isUrlValid } from "../../utils";

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
];

export default function ContactsScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const dispatch = useDispatch();
  // const userInfo = useSelector((store: any) => store.user);
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
          <ListItem bottomDivider>
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
              <ListItem.Title>{item.displayName}</ListItem.Title>
              <ListItem.Subtitle>{item.phoneNumber}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <TouchableOpacity
        style={{
          borderWidth: 0,
          position: "absolute",
          bottom: 60,
          right: 10,
        }}
        onPress={() => {
          Alert.alert("Button is pressed");
        }}
      >
        <Avatar
          rounded
          icon={{
            name: "person-add-alt-1",
            type: "material",
            size: 26,
            color: "white",
          }}
          containerStyle={{ backgroundColor: "orange", width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
});
