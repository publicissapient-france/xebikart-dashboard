import React, { useRef } from "react";
import { useSSE } from "react-hooks-sse";
import classnames from "classnames";

import styles from "./VoteResults.module.css";

import unicornText from "./txt-licorne.svg";
import zombieText from "./txt-zombie.svg";
import unicornImage from "./licorne.png";
import zombieImage from "./zombie.png";
import cadreImage from "./cadre.svg";

import confettiExplosion from "./explosion";

export default ({ className }) => {
  const leftBarRef = useRef(null);
  const rightBarRef = useRef(null);
  const votes = useSSE("SurveyVoteReceived", {
    initialState: {
      zombie: 0,
      unicorn: 0
    },
    stateReducer: (state, changes) => {
      if (changes.data.vote.choice === "1") {
        confettiExplosion(leftBarRef.current, { isUnicorn: false });
        return {
          ...state,
          zombie: state.zombie + 1
        };
      } else if (changes.data.vote.choice === "2") {
        confettiExplosion(rightBarRef.current, {
          isUnicorn: true,
          reverse: true
        });
        return {
          ...state,
          unicorn: state.unicorn + 1
        };
      }
    }
  });

  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.container__left}>
        <div className={styles.container__character}>
          <img
            alt="zombie-frame"
            src={cadreImage}
            className={styles.container__character__frame}
          />
          <img
            alt="zombie"
            src={zombieImage}
            className={styles.container__left__zombie}
          />
        </div>
        <img
          alt="zombie-text"
          src={zombieText}
          className={styles.container__characterName}
        />
        <div className={styles.container__digits}>
          000
          <div className={styles.container__digits__full}>{votes.zombie}</div>
        </div>
        <div className={styles.container__emptyDigits}>000</div>
      </div>
      <div className={styles.container__right}>
        <div className={styles.container__character}>
          <img
            alt="unicorn-frame"
            src={cadreImage}
            className={styles.container__character__frame}
          />
          <img
            alt="unicorn"
            src={unicornImage}
            className={styles.container__right__unicorn}
          />
        </div>
        <img
          alt="unicorn-text"
          src={unicornText}
          className={styles.container__characterName}
        />
        <div className={styles.container__digits}>
          000
          <div className={styles.container__digits__full}>{votes.unicorn}</div>
        </div>
      </div>
      <div className={styles.container__bottom}>
        <div
          className={classnames(
            styles.container__bottom__progress,
            styles["container__bottom__progress--left"]
          )}
          style={{ width: `${votes.zombie / 20}%` }}
        />
        <div
          className={classnames(
            styles.container__bottom__progress,
            styles["container__bottom__progress--right"]
          )}
          style={{ width: `${votes.unicorn / 20}%` }}
        />
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <div className={styles.container__bottom__emptyBar}></div>
          ))}
        <div
          ref={leftBarRef}
          style={{ left: `calc(${votes.zombie / 20}% - 0.75vh)` }}
          className={styles.container__bottom__progressPoint}
        />
        <div
          ref={rightBarRef}
          style={{ right: `calc(${votes.unicorn / 20}% - 0.75vh)` }}
          className={styles.container__bottom__progressPoint}
        />
      </div>
    </div>
  );
};
