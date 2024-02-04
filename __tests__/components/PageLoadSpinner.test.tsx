import { Modal, View } from "react-native";
import React from "react";
import { PageLoadSpinner } from "../../src/components";
import { render } from "@testing-library/react-native";

describe("PageLoadSpinner-component", () => {
  test("It should render successfully", () => {
    const { toJSON } = render(<PageLoadSpinner isLoading={true} />);
    // console.log("PageLoadSpinner: ", toJSON());
  });

  test('if we send "isLoading" as "true", it should visible', () => {
    const { toJSON, UNSAFE_getByType } = render(
      <PageLoadSpinner isLoading={true} />
    );
    // console.log("element: ", UNSAFE_getByType(Modal))
    const element = toJSON();
    expect(UNSAFE_getByType(Modal)).toBeVisible();
  });

  test('if we send "isLoading" as "false", it should not be exist', () => {
    const { UNSAFE_getByType } = render(<PageLoadSpinner isLoading={false} />);
    // console.log("element: ", UNSAFE_getByType(Modal))
    expect(UNSAFE_getByType(Modal)).not.toBeVisible();
  });
});
