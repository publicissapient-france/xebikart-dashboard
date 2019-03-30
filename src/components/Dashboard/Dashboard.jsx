import React from 'react';
import classnames from 'classnames';

import Cars from '../Cars/Cars';
import RaceInfos from '../RaceInfos/RaceInfos';
import styles from './Dashboard.module.css';
import RaceTrack from '../RaceTrack/RaceTrack';

export default ({className}) => {
  return (
    <div className={classnames(styles.container, className)}>
      <Cars className={styles.cars} />
      <RaceInfos className={styles.infos} />
      <RaceTrack className={styles.track} />
    </div>
  );
}