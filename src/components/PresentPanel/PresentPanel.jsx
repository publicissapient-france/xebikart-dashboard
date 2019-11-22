import React from "react";
import classnames from "classnames";
import { format } from "date-fns";

import { useSSE } from "react-hooks-sse";

import styles from "./PresentPanel.module.css";

import background from "./dashboard-xebikart-db2-bg.png";
import speedIndicator from "./dashboard-xebikart-db2-speed.svg";
import rearIndicator from "./dashboard-xebikart-db2-rear.svg";
import positionIndicator from "./dashboard-xebikart-db2-position.svg";
import radar from "./dashboard-xebikart-db2-radar.png";

export default ({ className }) => {
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
                ? Math.abs(raceStatus.user.throttle * 260)
                : 0
            }deg)`
          }}
        />
        <img
          alt="rear-left"
          src={rearIndicator}
          className={styles["container__rearIndicator--left"]}
          style={{
            transform: `rotate(${
              raceStatus.user && raceStatus.user.angle
                ? raceStatus.user.angle * 31
                : 0
            }deg)`
          }}
        />
        <img
          alt="rear-right"
          src={rearIndicator}
          className={styles["container__rearIndicator--right"]}
          style={{
            transform: `rotate(${
              raceStatus.user && raceStatus.user.angle
                ? raceStatus.user.angle * 31 + 180
                : 180
            }deg)`
          }}
        />
        <img
          alt="position"
          src={positionIndicator}
          className={styles.container__positionIndicator}
        />
        <div className={styles.container__time}>{format(time, "kk : mm")}</div>
        <div className={styles.container__date}>NOV 28 2019</div>
      </div>
    </>
  );
};
