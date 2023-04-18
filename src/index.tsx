import React from "react";
import { createRoot } from "react-dom/client";
import "./env-conditional";

Promise.all([
  import("./grid"),
  new Promise((res) => {
    setTimeout(res, 1000);
  }),
]).then(([{ Grid }]) => {
  const root = createRoot(document.getElementById("root"));
  root.render(<Grid />);
});
