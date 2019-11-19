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
  console.log("render");
  const state = useSSE("SurveyVoteReceived", {
    initialState: {
      zombieVotes: 0,
      unicornVotes: 0
    },
    stateReducer: (state, changes) => {
      if (changes.data.vote.choice === "1") {
        return {
          ...state,
          zombieVotes: state.zombieVotes + 1
        };
      } else if (changes.data.vote.choice === "2") {
        return {
          ...state,
          unicornVotes: state.unicornVotes + 1
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
          <div className={styles.container__digits__full}>
            {state.zombieVotes}
          </div>
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
          <div className={styles.container__digits__full}>
            {state.unicornVotes}
          </div>
        </div>
      </div>
      <div className={styles.container__bottom}>
        <div
          className={classnames(
            styles.container__bottom__progress,
            styles["container__bottom__progress--left"]
          )}
          style={{ width: `${state.zombieVotes / 10}%` }}
        />
        <div
          className={classnames(
            styles.container__bottom__progress,
            styles["container__bottom__progress--right"]
          )}
          style={{ width: `${state.unicornVotes / 10}%` }}
        />
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <div className={styles.container__bottom__emptyBar}></div>
          ))}
        <div
          style={{ left: `calc(${state.zombieVotes / 10}% - 0.75vh)` }}
          className={styles.container__bottom__progressPoint}
        />
        <div
          style={{ right: `calc(${state.unicornVotes / 10}% - 0.75vh)` }}
          className={styles.container__bottom__progressPoint}
        />
      </div>
    </div>
  );
};
