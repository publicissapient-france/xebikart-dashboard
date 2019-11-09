import React from 'react';

import styles from './Admin.module.css';
import {resetPoll, stopPoll, voteUniverse} from './Admin.service';

export default ({}) => {

  const voteUniverse1Android = () =>
    voteUniverse({universe: 1, platform: 'android'});

  const voteUniverse2Android = () =>
    voteUniverse({universe: 2, platform: 'ios'});

  const voteUniverse1iOS = () =>
    voteUniverse({universe: 1, platform: 'android'});

  const voteUniverse2iOS = () =>
    voteUniverse({universe: 2, platform: 'ios'});

  return (
    <div className={styles.admin}>
      <h1 className={styles.title}>Admin</h1>
      <ul>
        <li>
          <button className={styles.button} onClick={voteUniverse1Android}>Vote Universe 1 (Android)</button>
        </li>
        <li>
          <button className={styles.button} onClick={voteUniverse2Android}>Vote Universe 2 (Android)</button>
        </li>
        <li>
          <button className={styles.button} onClick={voteUniverse1iOS}>Vote Universe 1 (iOS)</button>
        </li>
        <li>
          <button className={styles.button} onClick={voteUniverse2iOS}>Vote Universe 2 (iOS)</button>
        </li>
        <li>
          <button className={styles.button} onClick={stopPoll}>⚠️ Stop poll</button>
        </li>
        <li>
          <button className={styles.button} onClick={resetPoll}>⚠️ Reset poll</button>
        </li>
      </ul>
    </div>
  );
}
