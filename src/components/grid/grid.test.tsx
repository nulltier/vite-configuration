import React from "react";
import { render } from "@testing-library/react";
import { Grid } from "./grid";
import { extractApi } from "../../testing/grid-api-context";

describe("ag grid", () => {
  test("render grid", async () => {
    const { getAllByTestId } = render(<Grid />);

    const makers = getAllByTestId("cell:maker");

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    expect(makers.length).toBe(9); // a header + 10 rows
  });

  test("access api", async () => {
    const { api } = await extractApi(<Grid />);

    expect(api.getDisplayedRowCount()).toBe(9);
    expect(api.getDataAsCsv()).toMatchSnapshot();
  });
});
