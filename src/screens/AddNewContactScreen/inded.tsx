import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import { TRootState } from "../../redux/store";
import { Avatar, Button, Icon } from "@rneui/themed";
import {
  email_validation,
  full_name_validation,
  mobile_number_validation,
} from "../../utils/inputValidations";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import {
  getUserInfoByPhoneNumberAPI,
  updateRecordInfoByDocIdAPI,
} from "../../api/users";
import { generateRandomId } from "../../utils";
import { IContactInfo } from "../../types";
import { AddNewContactAPI } from "../../api/contacts";
import { getAllMyContactsRequestAction } from "../../redux/actions/contacts";
import { useFetchUserInfoById } from "../../hooks";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AddNewContactScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === "dark";
  const loggedInUserInfo = useSelector(
    (store: TRootState) => store?.user?.data
  );
  const accountInfo = useFetchUserInfoById(loggedInUserInfo?.uid || "");

  const [errorInfo, setErrorInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { displayName, phoneNumber, email } = getValues();

  React.useEffect(() => {
    register(full_name_validation?.id, full_name_validation?.validation);
    register(
      mobile_number_validation?.id,
      mobile_number_validation?.validation
    );
    register(email_validation?.id, email_validation?.validation);
  }, [register]);

  // console.log("##errors: ", errors);
  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };

  const handleAddNewContact = () => {
    setIsLoading(true);
    setErrorInfo("");
    const payload: IContactInfo = {
      displayName,
      phoneNumber,
      email,
      id: generateRandomId(),
      parentId: accountInfo?.phoneNumber as string,
    };

    AddNewContactAPI(payload.id, payload)
      .then((res) => {
        // console.log("##res-for-successful: ", res);
        dispatch(
          getAllMyContactsRequestAction(accountInfo?.phoneNumber as string)
        );
        setIsLoading(false);
        setErrorInfo("");
        navigation.navigate(routeInfo?.CONTACTS);
      })
      .catch((error) => {
        console.log("##error: ", error);
        setIsLoading(false);
        setErrorInfo(error.message || "Something went wrong! please try again");
      });
  };

  const toggleIsLoading = () => setIsLoading(false);
  const resetErrorInfo = () => setErrorInfo("");
  const handleEditFromNewContactScreen = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <Modal
        transparent={true}
        animationType={"none"}
        visible={isLoading}
        style={{ zIndex: 1100 }}
        onRequestClose={() => {
          setIsLoading(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={isLoading}
              size={50}
              color={Colors.appThemeColor}
            />
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType={"none"}
        visible={errorInfo ? true : false}
        style={{ zIndex: 1100 }}
        onRequestClose={resetErrorInfo}
      >
        <View style={styles.modalBackgroundForError}>
          <View style={styles.activityIndicatorWrapperForError}>
            <View>
              <Icon
                name="closecircleo"
                size={40}
                type="antdesign"
                color={Colors.red}
                containerStyle={{margin: 10,}}
              />
              <Text style={[styles.errorIcon]}> Error!</Text>
              <Text style={[styles.errorMessage]}>{errorInfo}</Text>
            </View>
            <View style={[styles.modelButtonContainer]}>
              <Button
                title="wanna try again?"
                buttonStyle={{
                  backgroundColor: Colors.appThemeColor,
                }}
                onPress={resetErrorInfo}
              />
              <Button
                title="Exit"
                buttonStyle={{
                  backgroundColor: Colors.appThemeColor,
                }}
                onPress={handleEditFromNewContactScreen}
              />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle, { margin: 10 }]}
      >
        <View style={[styles.userIconContainer]}>
          <Avatar
            rounded
            icon={{
              name: "person-outline",
              type: "material",
              // size: 24,
              color: Colors.white,
            }}
            size={80}
            containerStyle={{ backgroundColor: Colors.gray }}
          />
          {/* <Text style={[styles.pageTitle]}>Add new Contact</Text> */}
        </View>
        <Input
          id={full_name_validation?.id}
          name={full_name_validation?.name}
          label={full_name_validation?.label}
          inputMode="text"
          placeholder={full_name_validation?.placeholder}
          onChangeText={(text) =>
            setValue(full_name_validation?.id, text, { shouldValidate: true })
          }
          errors={errors}
          value={displayName || ""}
        />
        <Input
          id={mobile_number_validation?.id}
          name={mobile_number_validation?.name}
          label={mobile_number_validation?.label}
          inputMode="tel"
          placeholder={mobile_number_validation?.placeholder}
          onChangeText={(text) =>
            setValue(mobile_number_validation?.id, text, {
              shouldValidate: true,
            })
          }
          errors={errors}
          value={phoneNumber || ""}
        />
        <Input
          id={email_validation?.id}
          name={email_validation?.name}
          label={email_validation?.label}
          inputMode="email"
          placeholder={email_validation?.placeholder}
          onChangeText={(text) =>
            setValue(email_validation?.id, text, { shouldValidate: true })
          }
          errors={errors}
          value={email || ""}
        />
      </ScrollView>
      <View style={[styles.proceedButtonContainer]}>
        <Button
          title="PROCEED TO CREATE"
          buttonStyle={{
            backgroundColor: Colors.appThemeColor,
          }}
          size="lg"
          titleStyle={{ fontWeight: "bold", fontSize: 20 }}
          // disabled={displayName && phoneNumber && email ? false : true}
          // disabledStyle={[styles.disabledButton]}
          // disabledTitleStyle={{ color: "white" }}
          onPress={handleSubmit(handleAddNewContact)}
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
  modalBackgroundForError: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  activityIndicatorWrapperForError: {
    // display: 'flex',
    alignItems: "center",
    padding: 10,
    justifyContent: "space-around",
    backgroundColor: Colors.white,
    width: 300,
    minHeight: 250,
    borderRadius: 20,
    gap: -50,
  },
  errorIcon: {
    fontSize: 25,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 18,
  },
  modelButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  userIconContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderColor: "red",
  },
  pageTitle: {
    // textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
    color: Colors.appThemeColor,
  },
  proceedButtonContainer: {
    marginTop: "auto",
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
});
