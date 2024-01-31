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
  TouchableHighlight,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useForm } from "react-hook-form";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, CustomButton, Divider } from "../../components";
import colors from "../../assets/colors";
import { routeInfo } from "../../constants/routes";
import {
  email_validation,
  password_validation,
} from "../../utils/inputValidations";
import { userSingInAction } from "../../redux/actions/userAccount";
import { Avatar, Button, Icon } from "@rneui/themed";
import { TRootState } from "../../redux/store";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen(props: {
  navigation: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const [errorInfo, setErrorInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loggedInUserInfo = useSelector((store: TRootState) => store?.user);
  console.log("###999: ", loggedInUserInfo);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const { email, password } = getValues();

  const handleRest = () => {
    // console.log("##restting the form data");
    reset({
      email: "",
      password: "",
    });
  };

  const onSubmit = (data: any) => {
    setIsLoading(true);
    setErrorInfo("");
    dispatch(userSingInAction(data));
  };

  React.useEffect(() => {
    register(email_validation?.id, email_validation?.validation);
    register(password_validation.id, password_validation.validation);
  }, [register]);

  React.useEffect(() => {
    const { code, message } = loggedInUserInfo?.error || {};
    if (code) {
      const errorMessage = (message || "").split("]")[1];
      setErrorInfo(errorMessage.trim() || "Something went wrong!");
      setIsLoading(false);
    }
  }, [loggedInUserInfo?.error]);
  // console.log('##errors: ', errors);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
  };

  const resetErrorInfo = () => setErrorInfo("");
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
                containerStyle={{ margin: 10 }}
              />
            </View>
            <Text style={[styles.errorIcon]}> Error!</Text>
            <Text style={[styles.errorMessage]}>{errorInfo}</Text>
            <View style={[styles.modelButtonContainer]}>
              <Button
                title="wanna try again?"
                buttonStyle={{
                  backgroundColor: Colors.appThemeColor,
                }}
                onPress={resetErrorInfo}
              />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle]}
      >
        <View style={styles.imageContainer}>
          <Avatar
            size={100}
            rounded={true}
            source={mashreqBankLogo}
          />
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.pageTitle}>Log In to your Account</Text>
        </View>
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
        <Input
          id={password_validation?.id}
          name={password_validation?.name}
          label={password_validation?.label}
          secureTextEntry={true}
          inputMode="text"
          placeholder={password_validation?.placeholder}
          onChangeText={(text) =>
            setValue(password_validation?.id, text, { shouldValidate: true })
          }
          errors={errors}
          value={password || ""}
        />
        <View style={styles.buttonsContainer}>
          {/* <CustomButton
                        title="Reset"
                        onPress={handleRest}
                        color="lightblue"
                    /> */}
          <Button
            title="Log In"
            buttonStyle={[
              styles.commonButtonStyles,
              {
                backgroundColor: Colors.appThemeColor,
              },
            ]}
            titleStyle={{ fontWeight: "bold" }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <TouchableHighlight style={{ marginVertical: 5 }}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableHighlight>
        </View>

        <Divider label="Or" color={"gray"} />
        <Button
          title="Don't have account? click here..."
          buttonStyle={[
            styles.commonButtonStyles,
            {
              backgroundColor: Colors.blue,
            },
          ]}
          titleStyle={{ fontWeight: "bold" }}
          onPress={() => {
            navigation?.navigate(routeInfo?.SIGN_UP);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
    minHeight: 300,
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
    // gap: 10,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    // // just for testing
    // borderWidth: 2,
    // borderColor: 'red',
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.appThemeColor,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  separator: {
    marginVertical: 20,
    borderWidth: 2,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    // marginTop: 10,
    // marginBottom: 10,
  },
  buttonsContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: "space-between",
    marginTop: 5,
  },
  forgotPasswordContainer: {
    marginTop: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  forgotPasswordText: {
    // color: colors.green,
  },
  commonButtonStyles: {
    borderWidth: 0,
    borderColor: "none",
    borderRadius: 30,
    marginVertical: 10,
  },
});
