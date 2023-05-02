import React, { createContext, PropsWithChildren } from "react";
import { GridReadyEvent } from "ag-grid-community";
import { act, render } from "@testing-library/react";

type ApiCallback = (ev: GridReadyEvent) => void;

export const GridContext = createContext<ApiCallback | undefined>(undefined);
interface GridApiContextProps {
  cb: (ev: GridReadyEvent) => void;
}

const GRID_EXTRACTOR_ID = "GridApiExtractor";
const GridApiExtractor: React.FC<PropsWithChildren<GridApiContextProps>> = (
  props
) => {
  return (
    <GridContext.Provider value={props.cb}>
      <div data-testid={GRID_EXTRACTOR_ID}>{props.children}</div>
    </GridContext.Provider>
  );
};

export function extractApi(grid: React.ReactNode): Promise<GridReadyEvent> {
  const wait = async (resolve) => {
    await act(() =>
      render(<GridApiExtractor cb={resolve}>{grid}</GridApiExtractor>)
    );
  };

  return new Promise((resolve) => {
    wait(resolve).catch((e) => {
      console.error("Grid Rendering Exception");
      throw e;
    });
  });
}
