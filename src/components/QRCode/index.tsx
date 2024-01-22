import React from "react";
import QRCode, { QRCodeProps } from "react-native-qrcode-svg";
import { mashreqBankLogo } from "../../assets/images";
import colors from "../../assets/colors";

const QRCODE = (props: QRCodeProps) => {
  const { value, getRef } = props;
  return (
    <QRCode
      value={value}
      size={250}
      color="black"
      backgroundColor={colors?.white}
      getRef={getRef}
      quietZone={15}
      // logo={mashreqBankLogo}
    />
  );
};

export default QRCODE;
