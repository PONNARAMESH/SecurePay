import "react-native";
import React, { ReactElement } from "react";

import AddNewContactScreen from "../../src/screens/AddNewContactScreen";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { useFetchUserInfoById } from "../../src/hooks";
import { ErrorPopUpModal, PageLoadSpinner } from "../../src/components";
import { Modal } from "react-native";
import {
  email_validation,
  full_name_validation,
  mobile_number_validation,
} from "../../src/utils/inputValidations";
import { ReactTestInstance } from "react-test-renderer";

jest.mock("../../src/hooks/useFetchUserInfoById.tsx");
const mockedUseFetchUserInfoById = useFetchUserInfoById as jest.MockedFunction<
  typeof useFetchUserInfoById
>;

const initialFormData = {
  displayName: "",
  phoneNumber: "",
  email: "",
};

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    register: jest.fn(),
    setValue: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
    getValues: () => ({ ...initialFormData }),
  }),
}));

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};

let renderedComponentInfo: ReturnType<typeof render>;
beforeEach(() => {
  const userAccountInfo = null;
  mockedUseFetchUserInfoById.mockReturnValue({
    userAccountInfo,
    isFetchingAccountInfo: false,
  });
  renderedComponentInfo = render(<AddNewContactScreen {...props} />);
});

describe("AddNewContactScreen-component", () => {
  test("It should render successfully", () => {
    const { root } = renderedComponentInfo;
    expect(root).toBeOnTheScreen();
  });

  test("At initial render, PageLoadSpinner & ErrorPopUpModal components should be hidden", () => {
    const {
      toJSON,
      root,
      UNSAFE_root,
      UNSAFE_getAllByType,
      debug,
    } = renderedComponentInfo;
    // console.log(debug()) // It'll print the rendered Component into the Console
    expect(root.findAllByType(Modal)[0]).not.toBeVisible(); // can do this way
    expect(UNSAFE_getAllByType(Modal)[1]).not.toBeVisible(); // & can do this way also
  });

  test("At initial render, FullName, PhoneNumber & Email input fields should be empty", () => {
    const { root, getByTestId } = renderedComponentInfo;
    // initial 'fullName' value should be empty
    const fullNameInputField = getByTestId(
      `textInput_${full_name_validation.id}`
    );
    expect(fullNameInputField).toBeVisible();
    waitFor(() => expect(fullNameInputField?.props?.value).toBe(""));

    // initial 'phone-number' value should be empty
    const phoneNumberInputField = getByTestId(
      `textInput_${mobile_number_validation.id}`
    );
    expect(phoneNumberInputField).toBeVisible();
    waitFor(() => expect(phoneNumberInputField?.props?.value).toBe(""));

    // initial 'email' value should be empty
    const emailInputField = getByTestId(`textInput_${email_validation.id}`);
    expect(emailInputField).toBeVisible();
    waitFor(() => expect(emailInputField?.props?.value).toBe(""));
  });

  test("After updating the 'FullName' input field, it should match with updated value", () => {
    const TEXT_TO_BE_UPDATED_WITH = "John";
    const { root, getByTestId } = renderedComponentInfo;

    /** testing Full name */
    const fullNameInputField = getByTestId(
      `textInput_${full_name_validation.id}`
    );
    expect(fullNameInputField).toBeVisible();

    // setting up some value into test
    fireEvent.changeText(
      fullNameInputField as ReactTestInstance,
      TEXT_TO_BE_UPDATED_WITH
    );
    // input should match with updated value
    waitFor(() =>
      expect(fullNameInputField?.props?.value).toBe(TEXT_TO_BE_UPDATED_WITH)
    );
  });

  test("After updating the 'Mobile number' input field, it should match with updated value", () => {
    const TEXT_TO_BE_UPDATED_WITH = "9876543210";
    const { root, getByTestId } = renderedComponentInfo;

    /** testing Full name */
    const mobileNumberInputField = getByTestId(
      `textInput_${mobile_number_validation.id}`
    );
    expect(mobileNumberInputField).toBeVisible();

    // setting up some value into test
    fireEvent.changeText(
      mobileNumberInputField as ReactTestInstance,
      TEXT_TO_BE_UPDATED_WITH
    );
    // input should match with updated value
    waitFor(() =>
      expect(mobileNumberInputField?.props?.value).toBe(TEXT_TO_BE_UPDATED_WITH)
    );
  });

  test("After updating the 'E-mail' input field, it should match with updated value", () => {
    const TEXT_TO_BE_UPDATED_WITH = "John@gmail.com";
    const { root, getByTestId } = renderedComponentInfo;

    /** testing Full name */
    const emailInputField = getByTestId(`textInput_${email_validation.id}`);
    expect(emailInputField).toBeVisible();

    // setting up some value into test
    fireEvent.changeText(
      emailInputField as ReactTestInstance,
      TEXT_TO_BE_UPDATED_WITH
    );
    // input should match with updated value
    waitFor(() =>
      expect(emailInputField?.props?.value).toBe(TEXT_TO_BE_UPDATED_WITH)
    );
  });

  test(`If the Full Name input is not matching the the validations, it's should show error `, async () => {
    const TEXT_TO_BE_UPDATED_WITH = "ram";
    const { root, getByTestId, queryByTestId } = renderedComponentInfo;

    /** testing error-message for Full name */
    let errorForFullNameInputField = queryByTestId(
      `errorMessage_${full_name_validation.id}`
    );
    expect(errorForFullNameInputField).toBeNull();

    const fullNameInputField = queryByTestId(
      `textInput_${full_name_validation.id}`
    );
    // setting up some value into test
    fireEvent.changeText(
      fullNameInputField as ReactTestInstance,
      TEXT_TO_BE_UPDATED_WITH
    );

    errorForFullNameInputField = queryByTestId(
      `errorMessage_${full_name_validation.id}`
    );
    waitFor(() => expect(errorForFullNameInputField).toBeVisible());
  });

  test(`If the Mobile Number input is not matching the the validations, it's should show error `, async () => {
    const TEXT_TO_BE_UPDATED_WITH = "98765";
    const { root, getByTestId, queryByTestId } = renderedComponentInfo;

    /** testing error-message for Mobile Number */
    let errorForMobileNumber = queryByTestId(
      `errorMessage_${mobile_number_validation.id}`
    );
    expect(errorForMobileNumber).toBeNull();

    const mobileNumberInputField = queryByTestId(
      `textInput_${full_name_validation.id}`
    );
    // setting up some value into test
    fireEvent.changeText(
      mobileNumberInputField as ReactTestInstance,
      TEXT_TO_BE_UPDATED_WITH
    );

    errorForMobileNumber = queryByTestId(
      `errorMessage_${full_name_validation.id}`
    );
    waitFor(() => expect(errorForMobileNumber).toBeVisible());
  });

  test(`If the Email input is not matching the the validations, it's should show error `, async () => {
    const TEXT_TO_BE_UPDATED_WITH = "tet@gma";
    const { root, getByTestId, queryByTestId } = renderedComponentInfo;

    /** testing error-message for E-mail */
    let errorForEmailInput = queryByTestId(
      `errorMessage_${mobile_number_validation.id}`
    );
    expect(errorForEmailInput).toBeNull();

    const emailInputField = queryByTestId(
      `textInput_${full_name_validation.id}`
    );
    // setting up some value into test
    fireEvent.changeText(
      emailInputField as ReactTestInstance,
      TEXT_TO_BE_UPDATED_WITH
    );

    errorForEmailInput = queryByTestId(
      `errorMessage_${full_name_validation.id}`
    );
    waitFor(() => expect(errorForEmailInput).toBeVisible());
  });
});
