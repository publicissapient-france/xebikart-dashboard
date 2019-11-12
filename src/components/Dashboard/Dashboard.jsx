import React, {useState, useEffect} from 'react';

import classnames from 'classnames';
import {Switch, Route, useHistory} from 'react-router-dom';
import {SSEProvider, useSSE} from 'react-hooks-sse';

import styles from './Dashboard.module.css';
import CarVideo from '../CarVideo/CarVideo';
import PastPanel from '../PastPanel/PastPanel';
import PresentPanel from '../PresentPanel/PresentPanel';
import FuturePanel from '../FuturePanel/FuturePanel';

export const DASHBOARD_MODES = ['past', 'present', 'future'];

export default ({raceStatus, mode, className}) => {
  const [value, setValue] = useState(0);
  const [stirValue, setStirValue] = useState(0);
  const [throttleValue, setThrottleValue] = useState(0);

  const history = useHistory();
  const state = useSSE('ModeSet');

  useEffect(() => {
    if (state && state.data.mode && DASHBOARD_MODES.find(d => d === state.data.mode)) {
      history.push(state.data.mode);
    }
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
      setStirValue(Math.random() * (Math.random() > 0.5 ? 1 : -1));
      setThrottleValue(Math.random());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div
      className={classnames(
        styles.container,
        styles[`container--${mode}`],
        className
      )}
    >
      <div className={styles.container__video}>
        <SSEProvider endpoint="http://state.xebik.art/car/video">
          <CarVideo/>
        </SSEProvider>
      </div>
      <Switch>
        <Route path="/past">
          <PastPanel
            raceStatus={{user: {throttle: throttleValue, angle: stirValue}}}
            className={styles.container__panel}
          />
        </Route>
        <Route path="/present">
          <PresentPanel
            raceStatus={{user: {throttle: throttleValue, angle: stirValue}}}
            className={styles.container__panel}
          />
        </Route>
        <Route path="/future">
          <FuturePanel
            raceStatus={{user: {throttle: throttleValue, angle: stirValue}}}
            className={styles.container__panel}
          />
        </Route>
      </Switch>
    </div>
  );

  // user.angle : -1 a 1
  // user.throttle : -0.25 a 0.25 (On ira de -1 a 1)
};
