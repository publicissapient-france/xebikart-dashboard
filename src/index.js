import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { SSEProvider } from "react-hooks-sse";

import "./index.css";

ReactDOM.render(
  <SSEProvider endpoint="http://state.xebik.art/events">
    <Router>
      <App />
    </Router>
  </SSEProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
