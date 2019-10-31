import React, { useEffect } from "react";

import { useSSE } from "react-hooks-sse";

import Dashboard from "./components/Dashboard/Dashboard";

import { Switch, Route, useHistory } from "react-router-dom";

import styles from "./App.module.css";

export default () => {
  const history = useHistory();
  const state = useSSE("incomingData");
  let raceStatus = { race: { state: "STARTED" } };

  useEffect(() => {
    if (state && state.data.screen) {
      history.push(state.data.screen);
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <Switch>
        <Route path="/coucou">COUCOU</Route>
        <Route path="/">
          <Dashboard
            raceStatus={state ? state.data : {}}
            className={styles.dashboard}
          />
        </Route>
      </Switch>
    </div>
  );
};