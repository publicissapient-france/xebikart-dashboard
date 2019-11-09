import React, {useState, useEffect} from 'react';
import styles from './Admin.module.css';
import {getEventSourceUniverse} from './Admin.service';

export default () => {
  const [events, setEvents] = useState(
    []
  );

  useEffect(() => {
    const source = getEventSourceUniverse();
    const listener = e => setEvents([{type: e.type, text: e.data, timestamp: Date.now()}, ...events]);
    source.addEventListener('SurveyVoteReceived', listener);
    source.addEventListener('SurveyCompleted', listener);
    return function cleanup() {
      source.removeEventListener('SurveyVoteReceived', listener);
      source.removeEventListener('SurveyCompleted', listener);
      source.close();
    };
  });

  return (
    <ul className={styles.sse}>
      {events.map(e => <li className={styles.console_line} key={e.timestamp}>✉️ <span
        className={styles[e.type]}>{e.type}</span> {e.text}</li>)}
    </ul>
  )
};
