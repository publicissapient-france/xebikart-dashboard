import React, {useState, useEffect} from 'react';
import classnames from 'classnames';

import Cars from '../Cars/Cars';
import RaceInfos from '../RaceInfos/RaceInfos';
import styles from './Dashboard.module.css';
import RaceTrack from '../RaceTrack/RaceTrack';

import SSEService from '../../services/sse  ';

export default ({className}) => {

  const [raceStatus, updateRaceStatus] = useState({race: {state: "AWAITING"}});

  useEffect(() => {
    const sseService = new SSEService({url : 'http://google.com', onMessage : handleReceiveStatus});
    return () => {
      sseService.unsubscribe();
    };
  });

  const handleReceiveStatus = event => {
    updateRaceStatus(event.data);
  }

  return (
    <div className={classnames(styles.container, className)}>
      <Cars className={styles.cars} />
      <RaceInfos raceStatus={raceStatus.race} className={styles.infos} />
      <RaceTrack className={styles.track} />
    </div>
  );
}