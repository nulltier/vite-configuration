import { service as prodService } from "./prod";
import { service as mockService } from "./mocks";

const devMode = () => import.meta.env.MODE === "development";
if (devMode()) {
  console.log("secrets", mockService.getSecrets());
} else {
  console.log("secrets", prodService.getSecrets());
}
