import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Context>
    <App />
  </Context>
  // </React.StrictMode>
);
