import React, { useState, Suspense, lazy } from "react";
import { AgGridReactProps } from "ag-grid-react";
import { ColDef, ColGroupDef, GridOptions } from "@ag-grid-community/core";
import { GridWrapper } from "../grid-wrapper/grid-wrapper";
import Button from "../button";

type ColumnDef = ColDef | ColGroupDef;

const data = [];

for (let i = 0, lim = 3; i < lim; i++) {
  data.push({ maker: "Toyota", model: "Celica", price: 35000, cool: "yes" });
  data.push({ maker: "Ford", model: "Mondeo", price: 32000, cool: "no" });
  data.push({ maker: "Porsche", model: "Boxster", price: 72000, cool: "yes" });
}

const simpleColDefs: ColumnDef[] = [
  {
    field: "maker",
    tooltipField: "maker",
    cellRenderer: (params) => {
      return <div data-testid="cell:maker">{params.value}</div>;
    },
    // no api to set data attribute
    headerClass: "qa-header",
  },
  {
    field: "model",
    sort: "asc",
    sortable: true,
    headerClass: "qa-header",
  },
  {
    field: "price",
    sort: "asc",
    sortable: true,
    headerClass: "qa-header",
  },
  {
    field: "cool",
    sort: "asc",
    sortable: true,
    headerClass: "qa-header",
  },
];

const LazyButton = lazy(async () => {
  const dynName = await new Promise((resolve) =>
    setTimeout(() => resolve("New Name"), 3000)
  );

  return { default: (props) => Button({ ...props, name: dynName }) };
});

function Grid() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowData, _setRowData] = useState(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [columnDefs, _setColumnDefs] = useState<ColumnDef[]>(simpleColDefs);

  const gridOptions: GridOptions = {
    columnDefs,
  };

  const agGridProps: AgGridReactProps = {
    domLayout: "autoHeight",
    enableBrowserTooltips: true,
    rowData,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    gridOptions,
  };

  return (
    <div className="canvas">
      <div className="ag-theme-alpine" data-testid="grid">
        <GridWrapper gridProps={agGridProps} />
      </div>
      <Suspense fallback="⌛">
        <LazyButton id={"id"} name={"name"} />
      </Suspense>
    </div>
  );
}

export { Grid };
