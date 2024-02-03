import "react-native";
import React from "react";

import { Divider, Separator } from "../../src/components";
import { act, render, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";

describe("Divider-component", () => {
  test("It should render successfully", () => {
    const label = "OR";
    render(<Divider label={label} color="red" />);
  });

  test("when passing the label as 'or' and it should contain label 'or'", () => {
    const label = "OR";
    const { getByText, queryByText } = render(
      <Divider label={label} color="red" />
    );
    expect(queryByText(label)).toBeVisible();
  });

  test("it should contain 2 View's & 1 Text components", () => {
    const { getAllByRole, queryAllByRole, getAllByTestId, toJSON } = render(
      <Divider label={"Or"} color="red" />
    );
    const element: renderer.ReactTestRendererJSON = toJSON() as renderer.ReactTestRendererJSON;
    // console.log("getByText: ", toJSON());
    expect(element?.children?.length).toBe(3);
    expect(element?.children[0]?.type).toBe("View");
    expect(element?.children[1]?.type).toBe("Text");
    expect(element?.children[2]?.type).toBe("View");
  });
});
