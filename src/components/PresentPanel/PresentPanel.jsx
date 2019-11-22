import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { format } from "date-fns";

import { useSSE } from "react-hooks-sse";

import styles from "./PresentPanel.module.css";

import background from "./dashboard-xebikart-db2-bg.png";
import speedIndicator from "./dashboard-xebikart-db2-speed.svg";
import rearIndicator from "./dashboard-xebikart-db2-rear.svg";
import positionIndicator from "./dashboard-xebikart-db2-position.svg";
import radar from "./dashboard-xebikart-db2-radar.png";

import radarDataSet from "../../dataset.json";

const normalizeRadarX = radarX => (radarX + 10000) * (220 / 20000) + 40;
const normalizeRadarY = radarY => (radarY + 10000) * (110 / 20000) + 20;

export default ({ className }) => {
  const [radarIndex, setRadarIndex] = useState(0);
  const time = new Date();
  const ref = useRef();
  let raceStatus;

  const raceData = useSSE("incomingData");
  if (raceData && raceData.data) {
    raceStatus = raceData.data;
  } else {
    raceStatus = { user: {} };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarIndex(val => val + 1);
    }, 100);
    return () => clearInterval(interval);
  });

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
