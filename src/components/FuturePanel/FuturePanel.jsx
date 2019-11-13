import React from "react";
import classnames from "classnames";

import { useSSE } from "react-hooks-sse";

import styles from "./FuturePanel.module.css";

import background from "./dashboard-xebikart-db3-bg.png";
import rearIndicator from "./dashboard-xebikart-db3-rear.svg";
import cover from "./dashboard-xebikart-db3-top.png";

const getRearZone = angle => {
  const zoneNumber = (Math.trunc((angle + 1) / (2 / 11)) + 1) % 12;
  return require(`./rear-zone-${zoneNumber}.png`);
};

export default ({ raceStatus, className }) => {
  const time = new Date();

  const raceData = useSSE("incomingData");
  if (raceData && raceData.data) {
    raceStatus = raceData.data;
  }

  return (
    <div className={classnames(styles.container, className)}>
      <img
        alt="background"
        className={styles.container__background}
        src={background}
      />
      <div className={styles["container__speedCounter--mph"]}>
        {raceStatus.user && raceStatus.user.throttle
          ? (raceStatus.user.throttle * 200).toFixed(0)
          : 0}
      </div>
      <div className={styles["container__speedCounter--km"]}>
        {raceStatus.user && raceStatus.user.throttle
          ? (raceStatus.user.throttle * 200 * 1.61).toFixed(0)
          : 0}
      </div>
      <div className={styles.container__speedIndicator}>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              className={styles.container__speedIndicator__emptyBar}
              style={{
                backgroundColor:
                  raceStatus.user &&
                  raceStatus.user.throttle &&
                  raceStatus.user.throttle >= (index + 1) / 10
                    ? "transparent"
                    : "#004b3e"
              }}
            ></div>
          ))}
      </div>
      {raceStatus.user && raceStatus.user.angle !== undefined ? (
        <img
          alt="rear-zone"
          src={getRearZone(raceStatus.user.angle)}
          className={styles.container__rearZone}
        />
      ) : null}
      <img
        alt="rear-left"
        src={rearIndicator}
        className={styles["container__rearIndicator--left"]}
        style={{
          transform: `rotate(${
            raceStatus.user && raceStatus.user.angle
              ? raceStatus.user.angle * 55
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
              ? raceStatus.user.angle * 55
              : 0
          }deg)`
        }}
      />
      <div className={styles.container__month}>NOV</div>
      <div className={styles.container__day}>28</div>
      <div className={styles.container__year}>2049</div>
      <div className={styles.container__hours}>{time.getHours()}</div>
      <div className={styles.container__colon}>:</div>
      <div className={styles.container__minutes}>{time.getMinutes()}</div>
      <img alt="cover" src={cover} className={styles.container__cover} />
    </div>
  );
};
