import React, {useState, useEffect} from 'react';
import classnames from 'classnames';

import Cars from '../Cars/Cars';
import RaceInfos from '../RaceInfos/RaceInfos';
import styles from './Dashboard.module.css';
import RaceTrack from '../RaceTrack/RaceTrack';

import SSEService from '../../services/sse';

export default ({className}) => {

  const [raceStatus, updateRaceStatus] = useState({race: {state: "STARTED"}});

  useEffect(() => {
    const sseService = new SSEService({url : 'http://state.xebik.art/events', onMessage : handleReceiveStatus});
    return () => {
      sseService.unsubscribe();
    };
  });

  const handleReceiveStatus = event => {
    const parsedStatus = JSON.parse(event.data);
    if(parsedStatus.race.state !== raceStatus.race.state) {
      updateRaceStatus(parsedStatus);
    }
  }

  return (
    <div className={classnames(styles.container, className)}>
      <Cars className={styles.cars} />
      <RaceInfos raceStatus={raceStatus.race} className={styles.infos} />
      <RaceTrack className={styles.track} />
    </div>
  );
}