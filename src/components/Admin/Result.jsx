import React from 'react';
import styles from './Admin.module.css';

export default ({result}) => {
  const addZero = (n) => n < 10 ? `0${n}` : n;

  const toPrettyDate = () => {
    const d = new Date(result.timestamp);
    return `${d.getHours()}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())}`;
  };

  return (
    <li className={styles.console_line}>{result.success ? '🟢' : '🔴'} {toPrettyDate()} {result.text}</li>
  );
};
