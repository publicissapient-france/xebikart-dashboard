import React from 'react';

import RaceStatus from './components/RaceStatus/RaceStatus';

import styles from './App.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <RaceStatus status="waiting" />
    </div>
  );
}
