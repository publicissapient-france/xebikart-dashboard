import React from "react";
import classnames from "classnames";

import carTopUrl from "./car_top.png";

import styles from "./RaceTrack.module.css";

export default ({ carPosition: { x, y }, className }) => {
  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.background}>
        <div className={styles.foreground}></div>
        <img
          className={styles.car}
          src={carTopUrl}
          style={{ top: `${y}%`, left: `${x}%` }}
        />
      </div>
    </div>
  );
};
