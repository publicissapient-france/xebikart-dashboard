import React from "react";
import { useSSE } from "react-hooks-sse";
import classnames from "classnames";

import styles from "./VoteResults.module.css";

import unicornText from "./txt-licorne.svg";
import zombieText from "./txt-zombie.svg";
import unicornImage from "./licorne.png";
import zombieImage from "./zombie.png";
import cadreImage from "./cadre.svg";

export default ({ className }) => {
  // const state = useSSE("incomingData");
  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.container__left}>
        <div className={styles.container__character}>
          <img
            src={cadreImage}
            className={styles.container__character__frame}
          />
          <img src={zombieImage} className={styles.container__left__zombie} />
        </div>
        <img src={zombieText} className={styles.container__characterName} />
        <div className={styles.container__digits}>
          000
          <div className={styles.container__digits__full}>75</div>
        </div>
        <div className={styles.container__emptyDigits}>000</div>
      </div>
      <div className={styles.container__right}>
        <div className={styles.container__character}>
          <img
            src={cadreImage}
            className={styles.container__character__frame}
          />
          <img
            src={unicornImage}
            className={styles.container__right__unicorn}
          />
        </div>
        <img src={unicornText} className={styles.container__characterName} />
        <div className={styles.container__digits}>
          000
          <div className={styles.container__digits__full}>75</div>
        </div>
      </div>
      <div className={styles.container__bottom}>
        <div
          className={classnames(
            styles.container__bottom__progress,
            styles["container__bottom__progress--left"]
          )}
          style={{ width: "32%" }}
        />
        <div
          className={classnames(
            styles.container__bottom__progress,
            styles["container__bottom__progress--right"]
          )}
          style={{ width: "32%" }}
        />
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <div className={styles.container__bottom__emptyBar}></div>
          ))}
        <div
          style={{ left: "calc(32% - 0.75vh)" }}
          className={styles.container__bottom__progressPoint}
        />
        <div
          style={{ right: "calc(32% - 0.75vh)" }}
          className={styles.container__bottom__progressPoint}
        />
      </div>
    </div>
  );
};
