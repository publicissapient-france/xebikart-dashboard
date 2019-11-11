import React from "react";
import classnames from "classnames";

import styles from "./PresentPanel.module.css";

import background from "./dashboard-xebikart-db2-bg.png";
import speedIndicator from "./dashboard-xebikart-db2-speed.svg";
import rearIndicator from "./dashboard-xebikart-db2-rear.svg";
import positionIndicator from "./dashboard-xebikart-db2-position.svg";

export default ({ raceStatus, className }) => {
  return (
    <div className={classnames(styles.container, className)}>
      <img className={styles.container__background} src={background} />
      <img
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
        src={positionIndicator}
        className={styles.container__positionIndicator}
      />
    </div>
  );
};
