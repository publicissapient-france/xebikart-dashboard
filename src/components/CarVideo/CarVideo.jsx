import React from "react";
import { useSSE } from "react-hooks-sse";
import classnames from "classnames";

import styles from "./CarVideo.module.css";

export default ({ className }) => {
  const state = useSSE("incomingData");
  return <div className={classnames(styles.container, className)}>{state}</div>;
};
