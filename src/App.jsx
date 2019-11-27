import React from "react";

import { SSEProvider } from "react-hooks-sse";

import Dashboard, { DASHBOARD_MODES } from "./components/Dashboard/Dashboard";
import Admin from "./components/Admin/Admin";

import { Switch, Route, Redirect } from "react-router-dom";

import styles from "./App.module.css";

export default () => {
  return (
    <div className={styles.container}>
      <Switch>
        <Redirect exact from="/" to="/image/xebicon19.svg" />
        <Route path="/admin">
          <Admin />
        </Route>
        <Route>
          <SSEProvider endpoint={`${process.env.REACT_APP_BACKEND_HOST}/modes`}>
            <Dashboard
              className={styles.dashboard}
              mode={DASHBOARD_MODES.PAST}
            />
          </SSEProvider>
        </Route>
      </Switch>
    </div>
  );
};
