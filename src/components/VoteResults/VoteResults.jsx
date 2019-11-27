import React, { useRef } from "react";
import { useSSE } from "react-hooks-sse";
import classnames from "classnames";

import styles from "./VoteResults.module.css";

import unicornText from "./txt-licorne.svg";
import zombieText from "./txt-zombie.svg";
import unicornImage from "./licorne.png";
import zombieImage from "./zombie.png";
import cadreImage from "./cadre.svg";
import androidLogo from "./android-white.svg";
import iosLogo from "./Apple_logo_white.svg";

import confettiExplosion from "./explosion";

export default ({ className }) => {
  const leftBarRef = useRef(null);
  const rightBarRef = useRef(null);
  const votes = useSSE("SurveyVoteReceived", {
    initialState: {
      zombie: {
        ios: 0,
        android: 0
      },
      unicorn: {
        ios: 0,
        android: 0
      }
    },
    stateReducer: (state, changes) => {
      if (changes.data.vote.choice === "1") {
        confettiExplosion(leftBarRef.current, { isUnicorn: false });
        return changes.data.vote.osOfParticipant === "android"
          ? {
              ...state,
              zombie: {
                ...state.zombie,
                android: state.zombie.android + 1
              }
            }
          : {
              ...state,
              zombie: {
                ...state.zombie,
                ios: state.zombie.ios + 1
              }
            };
      } else if (changes.data.vote.choice === "2") {
        confettiExplosion(rightBarRef.current, {
          isUnicorn: true,
          reverse: true
        });
        return changes.data.vote.osOfParticipant === "android"
          ? {
              ...state,
              unicorn: {
                ...state.unicorn,
                android: state.unicorn.android + 1
              }
            }
          : {
              ...state,
              unicorn: {
                ...state.unicorn,
                ios: state.unicorn.ios + 1
              }
            };
      }
    }
  });

  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.container__left}>
        <div className={styles.container__character}>
          <div className={styles.container__zombie__votes}>
            <div className={styles.container__zombie__votes__digits}>
              <div
                className={classnames(
                  styles.container__digits,
                  styles["container__digits--zombie-ios"]
                )}
              >
                000
                <div className={styles.container__digits__full}>
                  {votes.zombie.ios}
                </div>
              </div>
              <img
                alt="zombie-ios"
                src={iosLogo}
                className={styles.container__character__votes__ios}
              />
            </div>
            <div className={styles.container__zombie__votes__digits}>
              <div
                className={classnames(
                  styles.container__digits,
                  styles["container__digits--zombie-android"]
                )}
              >
                000
                <div className={styles.container__digits__full}>
                  {votes.zombie.android}
                </div>
              </div>
              <img
                alt="zombie-android"
                src={androidLogo}
                className={styles.container__character__votes__android}
              />
            </div>
          </div>
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
            {votes.zombie.android + votes.zombie.ios}
          </div>
        </div>
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
          <div className={styles.container__unicorn__votes}>
            <div className={styles.container__unicorn__votes__digits}>
              <div
                className={classnames(
                  styles.container__digits,
                  styles["container__digits--unicorn-ios"]
                )}
              >
                000
                <div className={styles.container__digits__full}>
                  {votes.unicorn.ios}
                </div>
              </div>
              <img
                alt="unicorn-ios"
                src={iosLogo}
                className={styles.container__character__votes__ios}
              />
            </div>
            <div className={styles.container__unicorn__votes__digits}>
              <div
                className={classnames(
                  styles.container__digits,
                  styles["container__digits--unicorn-android"]
                )}
              >
                000
                <div className={styles.container__digits__full}>
                  {votes.unicorn.android}
                </div>
              </div>
              <img
                alt="unicorn-android"
                src={androidLogo}
                className={styles.container__character__votes__android}
              />
            </div>
          </div>
        </div>
        <img
          alt="unicorn-text"
          src={unicornText}
          className={styles.container__characterName}
        />
        <div className={styles.container__digits}>
          000
          <div className={styles.container__digits__full}>
            {votes.unicorn.android + votes.unicorn.ios}
          </div>
        </div>
      </div>
      <div className={styles.container__bottom}>
        <div
          className={classnames(
            styles.container__bottom__progress,
            styles["container__bottom__progress--left"]
          )}
          style={{
            width: `${(votes.zombie.ios + votes.zombie.android) / 20}%`
          }}
        />
        <div
          className={classnames(
            styles.container__bottom__progress,
            styles["container__bottom__progress--right"]
          )}
          style={{
            width: `${(votes.unicorn.ios + votes.unicorn.android) / 20}%`
          }}
        />
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <div className={styles.container__bottom__emptyBar}></div>
          ))}
        <div
          ref={leftBarRef}
          style={{
            left: `calc(${(votes.zombie.ios + votes.zombie.android) /
              20}% - 0.75vh)`
          }}
          className={styles.container__bottom__progressPoint}
        />
        <div
          ref={rightBarRef}
          style={{
            right: `calc(${(votes.unicorn.ios + votes.unicorn.android) /
              20}% - 0.75vh)`
          }}
          className={styles.container__bottom__progressPoint}
        />
      </div>
    </div>
  );
};
