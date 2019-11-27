import React, { useState, useEffect, useRef } from "react";
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

import positionIndicators from "./positionIndicator";

// const normalizeRadarX = radarX => (radarX + 10000) * (200 / 20000) + 50;
// const normalizeRadarY = radarY => (radarY + 10000) * (90 / 20000) + 30;

const normalizeRadarX = radarX => (radarX + 6000) * (220 / 12000) + 50;
const normalizeRadarY = radarY => (radarY + 6000) * (110 / 12000) + 30;

export default ({ match, className }) => {
  const [radarIndex, setRadarIndex] = useState(0);
  const time = new Date();
  const ref = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarIndex(val => val + 1);
    }, 100);
    return () => clearInterval(interval);
  });

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
          {...positionIndicators[radarIndex % positionIndicators.length]}
          // {...positionIndicators[22 % positionIndicators.length]}
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
