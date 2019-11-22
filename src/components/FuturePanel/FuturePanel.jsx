import React, { useRef, useEffect, useState } from "react";
import classnames from "classnames";
import { format } from "date-fns";

import { useSSE } from "react-hooks-sse";

import styles from "./FuturePanel.module.css";

import background from "./dashboard-xebikart-db3-bg.png";
import rearIndicator from "./dashboard-xebikart-db3-rear.svg";
import cover from "./dashboard-xebikart-db3-top.png";
import radar from "./dashboard-xebikart-db3-radar.png";

import radarDataSet from "../../dataset.json";

const getRearZone = angle => {
  let zoneNumber = (Math.trunc((angle + 1) / (2 / 11)) + 1) % 12;
  if (zoneNumber === 0) {
    zoneNumber = 11;
  }
  return require(`./rear-zone-${zoneNumber}.png`);
};

const normalizeRadarX = radarX => (radarX + 10000) * (220 / 20000) + 40;
const normalizeRadarY = radarY => (radarY + 10000) * (110 / 20000) + 20;

export default ({ className }) => {
  const [radarIndex, setRadarIndex] = useState(0);
  const time = new Date();
  const ref = useRef();
  let raceStatus;

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarIndex(val => val + 1);
    }, 100);
    return () => clearInterval(interval);
  });

  const raceData = useSSE("incomingData");
  if (raceData && raceData.data) {
    raceStatus = raceData.data;
  } else {
    raceStatus = { user: {} };
  }

  useEffect(() => {
    if (ref.current && ref.current.getContext) {
      var ctx = ref.current.getContext("2d");
      const radarCoords = radarDataSet[radarIndex % 80];
      ctx.strokeStyle = "rgba(245,0,65,0.8)";
      ctx.fillStyle = "rgba(245,0,65,0.2)";
      ctx.beginPath();
      ctx.moveTo(
        normalizeRadarX(radarCoords[0]),
        normalizeRadarY(radarCoords[1])
      );
      radarCoords.slice(1).forEach(radarCoord => {
        ctx.lineTo(
          normalizeRadarX(radarCoord[0]),
          normalizeRadarY(radarCoord[1])
        );
      });
      ctx.stroke();
      ctx.closePath();
      ctx.fill();
    }
    return () => {
      ctx.clearRect(0, 0, 300, 200);
    };
  }, [raceStatus, radarIndex]);

  return (
    <>
      <div className={styles.radar}>
        <canvas ref={ref} className={styles.radar__pointsCloud}></canvas>
        <img alt="radar" className={styles.radar__img} src={radar} />
      </div>
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
                key={`speed-${index}`}
                className={styles.container__speedIndicator__emptyBar}
                style={{
                  backgroundColor:
                    raceStatus.user &&
                    raceStatus.user.throttle &&
                    raceStatus.user.throttle >= (index + 1) / 5
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
        <div className={styles.container__hours}>{format(time, "kk")}</div>
        <div className={styles.container__colon}>:</div>
        <div className={styles.container__minutes}>{format(time, "mm")}</div>
        <img alt="cover" src={cover} className={styles.container__cover} />
      </div>
    </>
  );
};
