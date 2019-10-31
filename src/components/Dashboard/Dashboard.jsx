import React, { useState, useEffect } from "react";
import classnames from "classnames";

import { SSEProvider } from "react-hooks-sse";

import styles from "./Dashboard.module.css";
import RaceTrack from "../RaceTrack/RaceTrack";

import StirJauge from "../StirJauge/StirJauge";
import ThrottleJauge from "../ThrottleGauge/ThrottleJauge";
import CarVideo from "../CarVideo/CarVideo";

export default ({ raceStatus, className }) => {
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

  if (raceStatus.car === 1) {
    console.log(raceStatus.acceleration);
  }

  return (
    <div className={classnames(styles.container, className)}>
      <SSEProvider endpoint="http://state.xebik.art/car/video">
        <CarVideo />
      </SSEProvider>
      <RaceTrack carPosition={raceStatus.position || {}} />
      <StirJauge value={raceStatus.user && raceStatus.user.angle * 200} />
      <ThrottleJauge
        value={raceStatus.user && raceStatus.user.throttle * 200}
      />
    </div>
  );

  // user.angle : -1 a 1
  // user.throttle : -0.25 a 0.25 (On ira de -1 a 1)
};
