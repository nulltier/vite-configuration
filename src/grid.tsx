import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ColDef, ColGroupDef, GridOptions } from "@ag-grid-community/core";
import { ReactSVG } from "react-svg";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";

type ColumnDef = ColDef | ColGroupDef;

const data = [];

for (let i = 0, lim = 500; i < lim; i++) {
  data.push({ make: "Toyota", model: "Celica", price: 35000, cool: "true" });
  data.push({ make: "Ford", model: "Mondeo", price: 32000, cool: "no" });
  data.push({ make: "Porsche", model: "Boxster", price: 72000, cool: "true" });
}

const simpleColDefs: ColumnDef[] = [
  {
    field: "make",
  },
  {
    field: "model",
  },
  {
    field: "price",
  },
  {
    field: "cool",
  },
];

function useForceRender() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCounter] = useState<number>(0);
  return useCallback(() => {
    setCounter((prev) => {
      return prev + 1;
    });
  }, []);
}
export const Grid = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowData, _setRowData] = useState(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [columnDefs, _setColumnDefs] = useState<ColumnDef[]>(simpleColDefs);
  const forceRender = useForceRender();

  useEffect(() => {
    const renderGrid = () => {
      forceRender();
      // setRowData([...data]);
      // setColumnDefs([...simpleColDefs]);
    };
    const interval = setInterval(renderGrid, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [forceRender]);

  const gridOptions: GridOptions = {
    columnDefs,
  };

  const agGridProps: AgGridReactProps = {
    domLayout: "autoHeight",
    rowData,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    gridOptions,
  };
  return (
    <div className="canvas">
      <ReactSVG src="/vite.svg" />
      <div className="ag-theme-alpine">
        <AgGridReact {...agGridProps}></AgGridReact>
      </div>
    </div>
  );
};
