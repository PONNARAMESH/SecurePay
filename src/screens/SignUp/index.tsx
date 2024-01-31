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
  Modal,
  ActivityIndicator,
} from "react-native";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../assets/colors";
import { mashreqBankLogo } from "../../assets/images";
import { Divider, Input } from "../../components";
import colors from "../../assets/colors";
import {
  confirm_password_validation,
  email_validation,
  full_name_validation,
  mobile_number_validation,
  password_validation,
} from "../../utils/inputValidations";
import { userSingUpAction } from "../../redux/actions";
import { Avatar } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";
import { TRootState } from "../../redux/store";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SignUpScreen(props: {
  navigation: any;
  route: any;
}): React.JSX.Element {
  const { navigation } = props;
  const isDarkMode = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const [errorInfo, setErrorInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loggedInUserInfo = useSelector((store: TRootState) => store?.user);
  // console.log("###loggedInUserInfo: ", loggedInUserInfo);
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
  } = useForm();
  const {
    displayName,
    phoneNumber,
    email,
    password,
    confirmPassword,
  } = getValues();

  const onSingUp = (data: any) => {
    setIsLoading(true);
    setErrorInfo("");
    dispatch(userSingUpAction(data));
  };

  useEffect(() => {
    register(full_name_validation?.id, full_name_validation?.validation);
    register(
      mobile_number_validation?.id,
      mobile_number_validation?.validation
    );
    register(email_validation?.id, email_validation?.validation);
    register(password_validation?.id, password_validation?.validation);
    register(confirm_password_validation?.id, {
      validate: (val: string) => {
        if (watch("password") != val) {
          return "Your passwords do not match";
        }
      },
      ...confirm_password_validation?.validation,
    });
  }, [register]);
  
  useEffect(() => {
    const { code, message } = loggedInUserInfo?.error || {};
    if (code) {
      const errorMessage = (message || "").split("]")[1];
      setErrorInfo(errorMessage.trim() || "Something went wrong!");
      setIsLoading(false);
    }
  }, [loggedInUserInfo?.error]);
  // console.log('##errors: ', errors);

  const resetErrorInfo = () => setErrorInfo("");

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    backgroundColor: Colors?.appThemeColorLight,
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
            // containerStyle={styles.tinyLogo}
          />
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.pageTitle}>Create Account</Text>
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
        <Input
          id={confirm_password_validation?.id}
          name={confirm_password_validation?.name}
          label={confirm_password_validation?.label}
          secureTextEntry={true}
          inputMode="text"
          placeholder={confirm_password_validation?.placeholder}
          onChangeText={(text) =>
            setValue(confirm_password_validation?.id, text, {
              shouldValidate: true,
            })
          }
          errors={errors}
          value={confirmPassword || ""}
        />
        <View style={styles.buttonsContainer}>
          <Button
            title="Sing UP"
            buttonStyle={[
              styles.commonButtonStyles,
              {
                backgroundColor: Colors.appThemeColor,
              },
            ]}
            titleStyle={{ fontWeight: 'bold' }}
            onPress={handleSubmit(onSingUp)}
          />
        </View>
        <Divider label="Or" color={"gray"} />
        <Button
          title="Already have an account? let's go to Log In.."
          buttonStyle={[
            styles.commonButtonStyles,
            {
              backgroundColor: Colors.blue,
            },
          ]}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => {
            navigation?.goBack();
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
    paddingTop: 10,
    paddingHorizontal: 20,
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
  },
  buttonsContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: "space-between",
    marginTop: 5,
  },
  commonButtonStyles: {
    borderWidth: 0,
    borderColor: "none",
    borderRadius: 30,
    marginVertical: 5,
  },
});
