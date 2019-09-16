import React, { useState, useEffect } from "react";
import classnames from "classnames";

import Cars from "../Cars/Cars";
import RaceInfos from "../RaceInfos/RaceInfos";
import styles from "./Dashboard.module.css";
import RaceTrack from "../RaceTrack/RaceTrack";

import SSEService from "../../services/sse";
import StirJauge from "../StirJauge/StirJauge";
import ThrottleJauge from "../ThrottleGauge/ThrottleJauge";

export default ({ className }) => {
  const [raceStatus, updateRaceStatus] = useState({
    race: { state: "STARTED" }
  });

  const [value, setValue] = useState(0);
  const [stirValue, setStirValue] = useState(0);
  const [throttleValue, setThrottleValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
      setStirValue(Math.random() * 200 - 100);
      setThrottleValue(Math.random() * 200 - 100);
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const sseService = new SSEService({
      url: "http://state.xebik.art/events",
      onMessage: handleReceiveStatus
    });
    return () => {
      sseService.unsubscribe();
    };
  });

  const handleReceiveStatus = event => {
    const parsedStatus = JSON.parse(event.data);
    if (parsedStatus.race.state !== raceStatus.race.state) {
      updateRaceStatus(parsedStatus);
    }
  };

  return (
    <div className={classnames(styles.container, className)}>
      <RaceTrack carPosition={value} />
      <StirJauge value={stirValue} />
      <ThrottleJauge value={throttleValue} />
    </div>
  );
};
