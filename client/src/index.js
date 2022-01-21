import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { PositionContext } from "./context.js";

ReactDOM.render(
  <React.StrictMode>
    <PositionContext>
      <App />
    </PositionContext>
  </React.StrictMode>,
  document.getElementById("root")
);
