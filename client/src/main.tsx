import App from "./App.tsx";
import {createRoot} from "react-dom/client";

const rootEl = document.getElementById("root");
const reactRoot = createRoot(rootEl!);

reactRoot.render(
  <App />
)
