import React from 'react';
import classnames from 'classnames';

import RaceStatus from '../RaceStatus/RaceStatus';
import RaceChrono from '../RaceChrono/RaceChrono';
import RaceTurns from '../RaceTurns/RaceTurns';

import styles from './RaceInfos.module.css';

export default ({raceStatus, className}) => {
  return (
    <div className={classnames(styles.container, className)}>
      <RaceStatus status={raceStatus.state} className={styles.status} />
      <RaceChrono className={styles.chrono} />
      <RaceTurns className={styles.turns} />
    </div>
  );
}