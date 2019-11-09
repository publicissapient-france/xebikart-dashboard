import React, { useState, useEffect } from "react";
import classnames from "classnames";

import { SSEProvider } from "react-hooks-sse";

import styles from "./Dashboard.module.css";
import RaceTrack from "../RaceTrack/RaceTrack";

import StirJauge from "../StirJauge/StirJauge";
import ThrottleJauge from "../ThrottleGauge/ThrottleJauge";
import CarVideo from "../CarVideo/CarVideo";

import pastModeBackground from "./dashboard-xebikart-db1-bg.png";

export const DASHBOARD_MODES = {
  PAST: "past",
  PRESENT: "present",
  FUTURE: "future"
};

export default ({ raceStatus, mode, className }) => {
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
    <div
      className={classnames(
        styles.container,
        styles[`container--${mode}`],
        className
      )}
    >
      <div className={styles.container__video}>
        <SSEProvider endpoint="http://state.xebik.art/car/video">
          <CarVideo />
        </SSEProvider>
      </div>
      <div className={styles.container__panel}>
        <img
          className={styles.container__panel__image}
          src={pastModeBackground}
        />
        {/* <StirJauge value={raceStatus.user && raceStatus.user.angle * 200} />
          <ThrottleJauge
            value={raceStatus.user && raceStatus.user.throttle * 200}
          /> */}
      </div>
    </div>
  );

  // user.angle : -1 a 1
  // user.throttle : -0.25 a 0.25 (On ira de -1 a 1)
};
