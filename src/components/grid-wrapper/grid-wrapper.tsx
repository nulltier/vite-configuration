import React, { useContext, useState } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { GridContext } from "../../testing/grid-api-context";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function useForceRender() {
  const [, forceRender] = useState([]);
  return () => {
    forceRender([]);
  };
}
export function GridWrapper({ gridProps }: { gridProps: AgGridReactProps }) {
  const cb = useContext(GridContext);
  const forceRender = useForceRender();

  const props: AgGridReactProps = {
    ...gridProps,
    onGridReady(event) {
      gridProps.onGridReady?.(event);

      if (cb) {
        cb(event);
        // just to make sure that the testing library handles async state updates properly
        forceRender();
      }
    },
  };

  return <AgGridReact {...props} />;
}
