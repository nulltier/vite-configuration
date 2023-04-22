import "./env-conditional";
import initTheme from "./init-theme";
import renderView from "./view";

console.log("ENV", import.meta.env);

initTheme();
renderView();
