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

import positionIndicators from "./positionIndicator";

const normalizeRadarX = radarX => (radarX + 10000) * (220 / 20000) + 40;
const normalizeRadarY = radarY => (radarY + 10000) * (110 / 20000) + 20;

export default ({ match, className }) => {
  const [radarIndex, setRadarIndex] = useState(0);
  const time = new Date();
  const ref = useRef();

  const raceStatus = useSSE("incomingData", {
    initialState: {
      user: {},
      borders: []
    },
    stateReducer: (state, changes) => {
      if (changes.data.car === parseInt(match.params.carId)) {
        return changes.data;
      } else {
        return state;
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarIndex(val => val + 1);
    }, 500);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (raceStatus.borders && ref.current && ref.current.getContext) {
      var ctx = ref.current.getContext("2d");
      // const radarCoords = radarDataSet[radarIndex % 80];
      const radarCoords = raceStatus.borders;
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
      ctx && ctx.clearRect(0, 0, 300, 200);
    };
  }, [raceStatus]);

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
          {...positionIndicators[radarIndex % positionIndicators.length]}
          // {...positionIndicators[39 % positionIndicators.length]}
        />
        <div className={styles.container__time}>{format(time, "kk : mm")}</div>
        <div className={styles.container__date}>NOV 28 2019</div>
      </div>
    </>
  );
};
