import React from "react";

import { SSEProvider } from "react-hooks-sse";

import Dashboard, { DASHBOARD_MODES } from "./components/Dashboard/Dashboard";
import Admin from "./components/Admin/Admin";
import VoteResults from "./components/VoteResults/VoteResults";

import { Switch, Route } from "react-router-dom";

import styles from "./App.module.css";

export default () => {
  return (
    <div className={styles.container}>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/vote">
          <SSEProvider
            endpoint={`${process.env.REACT_APP_BACKEND_HOST}/universes`}
          >
            <VoteResults />
          </SSEProvider>
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
