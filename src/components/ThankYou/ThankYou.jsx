import React from "react";

import top from "./theymadeit-top.svg";
import styles from "./ThankYou.module.css";

export default () => {
  return (
    <section className={styles.container}>
      {/*<div className={styles.container__indicator}>*/}
      {/*  <div className={styles.container__indicator__invisible}>*/}

      {/*  </div>*/}
      {/*  <div className={styles.container__indicator__red}>*/}

      {/*  </div>*/}
      {/*</div>*/}
      <div className={styles.side}></div>
      <div className={styles.container__background}>
        <div className={styles.container__contributors}>
          <div className={styles.contributors__column}>
            <span>Anne</span>
            <span>Benjamin</span>
            <span>Cathie</span>
            <span>David</span>
            <span>David S</span>
            <span>Florent</span>
            <span>Horgix</span>
            <span>Jaromir</span>
            <span>Jean-Pascal</span>
          </div>
          <div className={styles.contributors__column}>
            <span>Johan</span>
            <span>José</span>
            <span>Julien D</span>
            <span>Julien T</span>
            <span>Kristof</span>
            <span>Laurène</span>
            <span>Louis</span>
            <span>Nicolas</span>
            <span>Olivier C</span>
          </div>
          <div className={styles.contributors__column}>
            <span>Olivier P</span>
            <span>Pablo</span>
            <span>Paul-Guillaume</span>
            <span>Qian</span>
            <span>Raphaël</span>
            <span>Sergio</span>
            <span>Simone</span>
            <span>Thomas</span>
            <span>Tristan</span>
          </div>
        </div>
        <img src={top} className={styles.container__image} />
        <div className={styles.disclaimer}>
          <span>Disclaimer : Aucune licorne ni zombie n'a été maltraité</span>
        </div>
      </div>
      <div className={styles.side}></div>
      {/*<img className={styles.container__image} src={image} />*/}
    </section>
  );
};
