import React, {useState} from 'react';

import styles from './Admin.module.css';
import {resetPoll, stopPoll, voteUniverse} from './Admin.service';
import Result from './Result';

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
      </ul>
      <ul className={styles.console}>
        {results.map(result => <Result key={result.timestamp} result={result}/>)}
      </ul>
    </div>
  );
}
