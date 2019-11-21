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
  const votes = useSSE("SurveyVoteReceived", {
    initialState: {
      zombie: 0,
      unicorn: 0
    },
    stateReducer: (state, changes) => {
      if (changes.data.vote.choice === "1") {
        return {
          ...state,
          zombie: state.zombie + 1
        };
      } else if (changes.data.vote.choice === "2") {
        return {
          ...state,
          unicorn: state.unicorn + 1
        };
      }
    }
  });

  const winner = useSSE("SurveyCompleted", {
    initialState: undefined,
    stateReducer: (state, changes) => {
      if (changes.data.votes["1"] > changes.data.votes["2"]) {
        return "zombie";
      } else if (changes.data.votes["2"] > changes.data.votes["1"]) {
        return "unicorn";
      } else {
        return "draw";
      }
    }
  });

  return (
    <div className={classnames(styles.container, className)}>
      {winner ? (
        <div>{winner}</div>
      ) : (
        <>
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
                {votes.zombie}
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
                {votes.unicorn}
              </div>
            </div>
          </div>
          <div className={styles.container__bottom}>
            <div
              className={classnames(
                styles.container__bottom__progress,
                styles["container__bottom__progress--left"]
              )}
              style={{ width: `${votes.zombie / 10}%` }}
            />
            <div
              className={classnames(
                styles.container__bottom__progress,
                styles["container__bottom__progress--right"]
              )}
              style={{ width: `${votes.unicorn / 10}%` }}
            />
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <div className={styles.container__bottom__emptyBar}></div>
              ))}
            <div
              style={{ left: `calc(${votes.zombie / 10}% - 0.75vh)` }}
              className={styles.container__bottom__progressPoint}
            />
            <div
              style={{ right: `calc(${votes.unicorn / 10}% - 0.75vh)` }}
              className={styles.container__bottom__progressPoint}
            />
          </div>
        </>
      )}
    </div>
  );
};
