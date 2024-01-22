import React from "react";
import QRCode, { QRCodeProps } from "react-native-qrcode-svg";

const QRCODE = (props: QRCodeProps) => {
  const { value, getRef } = props;
  return (
    <QRCode
      value={value}
      size={250}
      color="black"
      backgroundColor="white"
      getRef={getRef}
    />
  );
};

export default QRCODE;
