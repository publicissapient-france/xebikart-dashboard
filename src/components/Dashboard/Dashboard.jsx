import React from 'react';

import Cars from '../Cars/Cars';
import RaceInfos from '../RaceInfos/RaceInfos';
import styles from './Dashboard.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <Cars />
      <RaceInfos />
    </div>
  );
}