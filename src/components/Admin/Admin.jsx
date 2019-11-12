import React, {useState} from 'react';

import styles from './Admin.module.css';
import {resetPoll, setMode, stopPoll, voteUniverse} from './Admin.service';
import ResultConsole from './ResultConsole';
import SseConsole from './SseConsole';

export default () => {

  const [results, setResults] = useState(
    []
  );

  const vote = async (universe) => {
    try {
      const result = await voteUniverse(universe);
      setResults([{
        timestamp: Date.now(),
        success: result,
        text: `Vote for universe ${universe.universe} and platform ${universe.platform}`
      }, ...results])
    } catch (e) {
      setResults([{
        timestamp: Date.now(),
        success: false,
        text: `Error when voting for universe`
      }, ...results])
    }
  };

  const stopUniversePoll = async () => {
    try {
      const result = await stopPoll();
      setResults([{
        timestamp: Date.now(),
        success: result,
        text: `Poll stopped`
      }, ...results])
    } catch (e) {
      setResults([{
        timestamp: Date.now(),
        success: false,
        text: `Error when stopping poll`
      }, ...results])
    }
  };

  const resetUniversePoll = async () => {
    try {
      const result = await resetPoll();
      setResults([{
        timestamp: Date.now(),
        success: result,
        text: `Poll reset`
      }, ...results])
    } catch (e) {
      setResults([{
        timestamp: Date.now(),
        success: false,
        text: `Error when resetting poll`
      }, ...results])
    }
  };

  const setDashboardMode = async (mode) => {
    try {
      const result = await setMode(mode);
      setResults([{
        timestamp: Date.now(),
        success: result,
        text: `Set Dashboard mode ${mode.mode}`
      }, ...results]);
    } catch (e) {
      setResults([{
        timestamp: Date.now(),
        success: false,
        text: `Error when setting Dashboard mode`
      }, ...results]);
    }
  };

  const setArMode = async (mode) => {
    try {
      const result = await setMode(mode);
      setResults([{
        timestamp: Date.now(),
        success: result,
        text: `Set AR mode ${mode.mode}`
      }, ...results]);
    } catch (e) {
      setResults([{
        timestamp: Date.now(),
        success: false,
        text: `Error when setting Dashboard mode`
      }, ...results]);
    }
  };

  return (
    <div className={styles.admin}>
      <ul className={styles.actions}>
        <li>
          <h1 className={styles.title}>Admin</h1>
        </li>
        <li>
          <button className={styles.button} onClick={() => vote({universe: 1, platform: 'android'})}>
            Vote universe 1 (Android)
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={() => vote({universe: 2, platform: 'android'})}>
            Vote universe 2 (Android)
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={() => vote({universe: 1, platform: 'ios'})}>
            Vote universe 1 (iOS)
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={() => vote({universe: 2, platform: 'ios'})}>
            Vote Universe 2 (iOS)
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={stopUniversePoll}>⚠️ Stop poll</button>
        </li>
        <li>
          <button className={styles.button} onClick={resetUniversePoll}>⚠️ Reset poll</button>
        </li>
        <li>
          <button className={styles.button} onClick={() => setDashboardMode({mode: 'past'})}>Mode Past</button>
        </li>
        <li>
          <button className={styles.button} onClick={() => setDashboardMode({mode: 'present'})}>Mode Present</button>
        </li>
        <li>
          <button className={styles.button} onClick={() => setDashboardMode({mode: 'future'})}>Mode Future</button>
        </li>
        <li>
          <button className={styles.button} onClick={() => setArMode({mode: 'city'})}>AR City</button>
        </li>
        <li>
          <button className={styles.button} onClick={() => setArMode({mode: 'cityOverboard'})}>AR City Overboard</button>
        </li>
        <li>
          <button className={styles.button} onClick={() => setArMode({mode: 'cityNike'})}>AR City Nike</button>
        </li>
        <li>
          <button className={styles.button} onClick={() => setArMode({mode: 'unicorn'})}>AR Unicorn</button>
        </li>
        <li>
          <button className={styles.button} onClick={() => setArMode({mode: 'minecraft'})}>AR Minecraft</button>
        </li>
      </ul>
      <ResultConsole results={results}/>
      <SseConsole/>
    </div>
  );
}
