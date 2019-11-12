import React from 'react';

import {SSEProvider} from 'react-hooks-sse';

import Dashboard, {DASHBOARD_MODES} from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';

import {Switch, Route} from 'react-router-dom';

import styles from './App.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <Switch>
        <Route path="/coucou">COUCOU</Route>
        <Route path="/admin">
          <Admin/>
        </Route>
        <SSEProvider endpoint={`${process.env.REACT_APP_BACKEND_HOST}/modes`}>
          <Route path="/">
            <Dashboard
              className={styles.dashboard}
              mode={DASHBOARD_MODES.PAST}/>
          </Route>
        </SSEProvider>
      </Switch>
    </div>
  );
};
