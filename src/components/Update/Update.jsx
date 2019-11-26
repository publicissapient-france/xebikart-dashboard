import React, { useState } from "react";
import { useTimeoutFn } from 'react-use';

import styles from "./Update.module.css";

export default () => {
  const [state, setState] = useState([styles.ko, styles.ko, styles.ko]);
  useTimeoutFn(() => {
    setState(() => [styles.ok, styles.ko, styles.ko]);
  }, 2000);
  useTimeoutFn(() => {
    setState(() => [styles.ok, styles.ok, styles.ko]);
  }, 3000);
  useTimeoutFn(() => {
    setState(() => [styles.ok, styles.ok, styles.ok]);
  }, 4000);
  return (
    <div className={styles.update}>
      <div className={state[0]}>
      </div>
      <div className={state[1]}>
      </div>
      <div className={state[2]}>
      </div>
    </div>
  );
};
