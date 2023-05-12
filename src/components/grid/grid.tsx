import React, { useState, Suspense, lazy } from "react";
import { Observable } from "rxjs";
import { AgGridReactProps } from "ag-grid-react";
import { ColDef, ColGroupDef, GridOptions } from "@ag-grid-community/core";
import { GridReadyEvent } from "ag-grid-community";
import { GridWrapper } from "../grid-wrapper/grid-wrapper";
import { randomIntInRange, randomItem } from "../../tools/random";
import Button from "../button";
import { crazyViewSpecificFunction } from "../../views/tools";

type ColumnDef = ColDef | ColGroupDef;

interface Car {
  id: string;
  maker: string;
  model: string;
  price: number;
  cool: "yes" | "no";
}

const makers = ["Toyota", "Ford", "Porche"];
const models = ["Celica", "Mondeo", "Boxter"];

function createCar(): Car {
  const index = randomIntInRange(0, 2);
  return {
    id: randomIntInRange(0, 1000).toString(),
    maker: makers[index],
    model: models[index],
    price: randomIntInRange(35000, 70000),
    cool: randomItem(["yes", "no"]),
  };
}

const observable = new Observable<Car>((subscriber) => {
  for (let i = 0; i < 1000; i++) {
    subscriber.next(createCar());
  }

  setInterval(() => {
    subscriber.next(createCar());
  }, 10);
});

function subscribeOnData(grid: GridReadyEvent | undefined) {
  const added: Set<string> = new Set();

  observable.subscribe((car) => {
    const row = grid.api.getRowNode(car.id);

    if (row) {
      grid.api.applyTransaction({ update: [car] });
    } else {
      if (!added.has(car.id)) {
        added.add(car.id);
        grid.api.applyTransaction({ add: [car] });
      }
    }
  });
}

const simpleColDefs: ColumnDef[] = [
  {
    field: "id",
    sortable: true,
    sort: "asc",
  },
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
    sortable: true,
    headerClass: "qa-header",
  },
  {
    field: "price",
    sortable: true,
    headerClass: "qa-header",
  },
  {
    field: "cool",
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
  const [columnDefs, _setColumnDefs] = useState<ColumnDef[]>(simpleColDefs);

  const gridOptions: GridOptions = {
    columnDefs,
    animateRows: true,
  };

  const agGridProps: AgGridReactProps = {
    id: "cars_grid",
    enableBrowserTooltips: true,
    asyncTransactionWaitMillis: 1000,
    getRowId: (data) => {
      return data.data.id;
    },
    onGridReady: (event: GridReadyEvent): void => {
      subscribeOnData(event);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    gridOptions,
  };

  crazyViewSpecificFunction();

  return (
    <div className="canvas">
      <div className="grid ag-theme-alpine" data-testid="grid">
        <GridWrapper gridProps={agGridProps} />
      </div>
      <Suspense fallback="⌛">
        <LazyButton id={"id"} name={"name"} />
      </Suspense>
    </div>
  );
}

export { Grid };
