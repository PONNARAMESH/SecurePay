import { Button, Icon } from "@rneui/themed";
import { Modal, Text, View } from "react-native";
import Colors from "../../assets/colors";
import { StyleSheet } from "react-native";

export type TErrorPopUpModal = {
  isVisible: boolean;
  errorInfo: string;
  resetErrorInfo: () => void;
  handleExitFromNewContactScreen?: () => void;
};

export const ErrorPopUpModal = (props: TErrorPopUpModal) => {
  const {
    isVisible,
    errorInfo,
    resetErrorInfo,
    handleExitFromNewContactScreen,
  } = props;
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={isVisible}
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
            {handleExitFromNewContactScreen && (
              <Button
                title="Exit"
                buttonStyle={{
                  backgroundColor: Colors.appThemeColor,
                }}
                onPress={handleExitFromNewContactScreen}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    // gap: -50,
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
});
