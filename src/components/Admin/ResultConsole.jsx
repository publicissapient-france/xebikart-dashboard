import React from 'react';
import styles from './Admin.module.css';

export default ({results}) => {
  const addZero = (n) => n < 10 ? `0${n}` : n;

  const toPrettyDate = (result) => {
    const d = new Date(result.timestamp);
    return `${d.getHours()}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())}`;
  };

  return (
    <ul className={styles.console}>
      {results.map(result => <li
        key={result.timestamp}
        className={styles.console_line}>{result.success ? '🟢' : '🔴'} {toPrettyDate(result)} {result.text}</li>)}
    </ul>
  );
};
