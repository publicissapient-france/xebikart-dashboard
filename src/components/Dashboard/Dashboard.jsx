import React, { useEffect } from "react";

import classnames from "classnames";
import { Switch, Route, useHistory } from "react-router-dom";
import { SSEProvider, useSSE } from "react-hooks-sse";

import styles from "./Dashboard.module.css";
import CarVideo from "../CarVideo/CarVideo";
import PastPanel from "../PastPanel/PastPanel";
import PresentPanel from "../PresentPanel/PresentPanel";
import FuturePanel from "../FuturePanel/FuturePanel";
import VoteResults from "../VoteResults/VoteResults";
import Video from "../Video/Video";

export const DASHBOARD_MODES = ["past", "present", "future", "vote", "video"];

export default ({mode, className}) => {
  const history = useHistory();
  const state = useSSE("ModeSet");

  useEffect(() => {
    if (
      state &&
      state.data.mode &&
      DASHBOARD_MODES.find(d => d === state.data.mode)
    ) {
      if (state.data.data) {
        if (state.data.data.carId) {
          history.push(`/${state.data.mode}/${state.data.data.carId}`);
        } else if (state.data.data.videoId) {
          history.push(`/${state.data.mode}/${state.data.data.videoId}`);
        }
      } else {
        history.push(`/${state.data.mode}`);
      }
    }
  }, [history, state]);

  return (
    <div
      className={classnames(
        styles.container,
        styles[`container--${mode}`],
        className
      )}
    >
      <Switch>
        <SSEProvider endpoint={`${process.env.REACT_APP_BACKEND_HOST}/events`}>
          <Route
            path="/past/:carId?"
            render={props => (
              <>
                <div className={styles.container__video}>
                  <Route path="/:mode/:carId" component={CarVideo} />
                </div>
                <PastPanel {...props} className={styles.container__panel} />
              </>
            )}
          />
          <Route
            path="/present/:carId?"
            render={props => (
              <>
                <div className={styles.container__video}>
                  <Route path="/:mode/:carId" component={CarVideo} />
                </div>
                <PresentPanel {...props} className={styles.container__panel} />
              </>
            )}
          />
          <Route
            path="/future/:carId?"
            render={props => (
              <>
                <div className={styles.container__video}>
                  <Route path="/:mode/:carId" component={CarVideo} />
                </div>
                <FuturePanel {...props} className={styles.container__panel} />
              </>
            )}
          />
          <Route path="/vote">
            <SSEProvider
              endpoint={`${process.env.REACT_APP_BACKEND_HOST}/universes`}
            >
              <VoteResults />
            </SSEProvider>
          </Route>
          <Route
            path="/video/:videoId"
            component={Video}
          />
        </SSEProvider>
      </Switch>
    </div>
  );

  // user.angle : -1 a 1
  // user.throttle : -0.25 a 0.25 (On ira de -1 a 1)
};
