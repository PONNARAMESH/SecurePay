import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import Colors from "../../assets/colors";

export type TPageLoadSpinnerComponent = {
  isLoading: boolean;
};

export const PageLoadSpinner = (props: TPageLoadSpinnerComponent) => {
  const { isLoading } = props;
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={isLoading}
      style={{ zIndex: 1100 }}
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
  );
};

const styles = StyleSheet.create({
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
});
