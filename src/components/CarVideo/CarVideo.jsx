import React from "react";
import { useSSE } from "react-hooks-sse";
import classnames from "classnames";

import videoBackground from "./video.jpg";

import styles from "./CarVideo.module.css";

export default ({ className }) => {
  const state = useSSE("incomingData");
  return (
    <div className={classnames(styles.container, className)}>
      <img className={styles.container__video} src={videoBackground} />
    </div>
  );
};
