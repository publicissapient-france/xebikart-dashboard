import React from 'react';
import styles from './Admin.module.css';
import {toPrettyTime} from './Util';

export default ({results}) => {
  return (
    <ul className={styles.console}>
      {results.map(result => <li
        key={result.timestamp}
        className={styles.console_line}>{result.success ? '🟢' : '🔴'} {toPrettyTime(result.timestamp)} {result.text}</li>)}
    </ul>
  );
};
