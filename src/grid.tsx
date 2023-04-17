import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColGroupDef, GridOptions } from "@ag-grid-community/core";
import { ReactSVG } from "react-svg";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type ColumnDef = ColDef | ColGroupDef;

const data = [];

for (let i = 0, lim = 500; i < lim; i++) {
  data.push({ make: "Toyota", model: "Celica", price: 35000, cool: "true" });
  data.push({ make: "Ford", model: "Mondeo", price: 32000, cool: "no" });
  data.push({ make: "Porsche", model: "Boxster", price: 72000, cool: "true" });
}

const Renderer = (params) => {
  return (
    <div>
      Value is <b> {params.value} </b>
    </div>
  );
};

const _complexColDefs: ColumnDef[] = [
  {
    field: "make",
    cellRenderer: Renderer,
  },
  {
    field: "model",
    cellRenderer: Renderer,
  },
  {
    field: "price",
    cellRenderer: Renderer,
  },
];

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
  const [_, setCounter] = useState<number>(0);
  return useCallback(() => {
    setCounter((prev) => {
      return prev + 1;
    });
  }, []);
}
export const Grid = () => {
  const [rowData, _setRowData] = useState(data);
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

  return (
    <>
      <ReactSVG src="/vite.svg" />
      <div className="ag-theme-alpine">
        <AgGridReact
          domLayout="autoHeight"
          rowData={rowData}
          gridOptions={gridOptions}
        ></AgGridReact>
      </div>
    </>
  );
};
