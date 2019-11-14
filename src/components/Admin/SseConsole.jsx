import React, {useState, useEffect} from 'react';
import styles from './Admin.module.css';
import {getEventSourceMode, getEventSourceUniverse} from './Admin.service';
import {toPrettyTime} from './Util';

export default () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const universe = getEventSourceUniverse();
    const mode = getEventSourceMode();
    const listener = e =>
      setEvents(evs => [
        {type: e.type, text: e.data, timestamp: Date.now()},
        ...evs,
      ]);
    universe.addEventListener('SurveyVoteReceived', listener);
    universe.addEventListener('SurveyCompleted', listener);
    mode.addEventListener('ModeSet', listener);
    return () => {
      universe.removeEventListener('SurveyVoteReceived', listener);
      universe.removeEventListener('SurveyCompleted', listener);
      mode.removeEventListener('ModeSet', listener);
      universe.close();
      mode.close();
    };
  }, []);

  return (
    <ul className={styles.sse}>
      {events.map(e => (
        <li
          className={styles.console_line}
          key={e.timestamp}
        >
          <span role="img" aria-label="time">
            ✉️
          </span>{' '}
          {toPrettyTime(e.timestamp)}{' '}
          <span className={styles[e.type]}>{e.type}</span> {e.text}
        </li>
      ))}
    </ul>
  );
};
