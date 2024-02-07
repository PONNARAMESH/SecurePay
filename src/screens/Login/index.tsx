import React, { useCallback, useState } from "react";
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
} from "react-native";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Input, Divider, PageLoadSpinner, ErrorPopUpModal } from "../../components";
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
  // console.log("###999: ", loggedInUserInfo);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const { email, password } = getValues();

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

  const resetErrorInfo = useCallback(() => setErrorInfo(""), []);
  return (
    <SafeAreaView style={[styles.screenContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={Colors.appThemeColor}
      />
      <PageLoadSpinner isLoading={isLoading} />
      <ErrorPopUpModal
        isVisible={errorInfo ? true : false}
        errorInfo={errorInfo}
        resetErrorInfo={resetErrorInfo}
      />
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
