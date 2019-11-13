import React from "react";
import classnames from "classnames";

import { useSSE } from "react-hooks-sse";

import styles from "./PastPanel.module.css";

import background from "./dashboard-xebikart-db1-bg.png";
import speedIndicator from "./dashboard-xebikart-db1-speed.svg";
import hourIndicator from "./dashboard-xebikart-db1-hour.svg";
import minuteIndicator from "./dashboard-xebikart-db1-minute.svg";
import rearIndicator from "./dashboard-xebikart-db1-rear.svg";
import positionIndicator from "./dashboard-xebikart-db1-position.svg";
import cover from "./dashboard-xebikart-db1-top.png";

export default ({ raceStatus, className }) => {
  const time = new Date();

  const raceData = useSSE("incomingData");
  if (raceData && raceData.data) {
    raceStatus = raceData.data;
  }

  return (
    <div className={classnames(styles.container, className)}>
      <img className={styles.container__background} src={background} />
      <img
        src={speedIndicator}
        className={styles.container__speedIndicator}
        style={{
          transform: `rotate(${
            raceStatus.user && raceStatus.user.throttle
              ? Math.abs(raceStatus.user.throttle * 240)
              : 0
          }deg)`
        }}
      />
      <img
        src={rearIndicator}
        className={styles.container__rearIndicator}
        style={{
          transform: `rotate(${
            raceStatus.user && raceStatus.user.angle
              ? raceStatus.user.angle * 40
              : 0
          }deg)`
        }}
      />
      <img
        src={positionIndicator}
        className={styles.container__positionIndicator}
      />
      <img
        src={minuteIndicator}
        className={styles.container__minuteIndicator}
        style={{
          transform: `rotate(${time.getMinutes() * 6}deg)`
        }}
      />
      <img
        src={hourIndicator}
        className={styles.container__hourIndicator}
        style={{
          transform: `rotate(${((time.getHours() % 12) * 5 +
            time.getMinutes() / 12) *
            6}deg)`
        }}
      />
      <img src={cover} className={styles.container__cover} />
    </div>
  );
};
