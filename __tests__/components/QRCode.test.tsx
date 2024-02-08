import { QRCodeProps } from "react-native-qrcode-svg";
import QRCode from "../../src/components/QRCode";
import {render} from "@testing-library/react-native";
import * as QRCodeModule from 'react-native-qrcode-svg';

jest.mock("react-native-qrcode-svg");

const staticData: QRCodeProps = {
    value: JSON.stringify({phoneNumber: "9876543216"}),
    getRef: jest.fn(),
};

describe('QRCode component', ()=> {
    test('It should render successfully', () => {
        const {} = render(<QRCode {...staticData}/>)
    })
});