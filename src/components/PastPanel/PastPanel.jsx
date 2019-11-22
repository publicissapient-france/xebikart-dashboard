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
import radar from "./dashboard-xebikart-db1-radar.png";

export default ({ match, className }) => {
  const time = new Date();
  let raceStatus;

  const raceData = useSSE("incomingData");
  if (raceData && raceData.data) {
    raceStatus = raceData.data;
  } else {
    raceStatus = { user: {} };
  }

  return (
    <>
      <img alt="radar" className={styles.radar} src={radar} />
      <div className={classnames(styles.container, className)}>
        <img
          alt="background"
          className={styles.container__background}
          src={background}
        />
        <img
          alt="speed"
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
          alt="rear"
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
          alt="position"
          src={positionIndicator}
          className={styles.container__positionIndicator}
        />
        <img
          alt="minute"
          src={minuteIndicator}
          className={styles.container__minuteIndicator}
          style={{
            transform: `rotate(${time.getMinutes() * 6}deg)`
          }}
        />
        <img
          alt="hour"
          src={hourIndicator}
          className={styles.container__hourIndicator}
          style={{
            transform: `rotate(${((time.getHours() % 12) * 5 +
              time.getMinutes() / 12) *
              6}deg)`
          }}
        />
        <img alt="cover" src={cover} className={styles.container__cover} />
        <div className={styles.container__month}>NOV</div>
        <div className={styles.container__day}>28</div>
        <div className={styles.container__year}>1993</div>
      </div>
    </>
  );
};
