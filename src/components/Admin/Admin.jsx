import React, { useState } from 'react';

import styles from './Admin.module.css';
import { resetPoll, setMode, stopPoll, voteUniverse } from './Admin.service';
import ResultConsole from './ResultConsole';
import SseConsole from './SseConsole';
import { SSEProvider } from 'react-hooks-sse';

export default () => {
  const [results, setResults] = useState([]);

  const vote = async universe => {
    try {
      const result = await voteUniverse(universe);
      setResults([
        {
          timestamp: Date.now(),
          success: result,
          text: `Vote for universe ${universe.universe} and platform ${universe.platform}`
        },
        ...results
      ]);
    } catch (e) {
      setResults([
        {
          timestamp: Date.now(),
          success: false,
          text: `Error when voting for universe`
        },
        ...results
      ]);
    }
  };

  const stopUniversePoll = async () => {
    try {
      const result = await stopPoll();
      setResults([
        {
          timestamp: Date.now(),
          success: result,
          text: `Poll stopped`
        },
        ...results
      ]);
    } catch (e) {
      setResults([
        {
          timestamp: Date.now(),
          success: false,
          text: `Error when stopping poll`
        },
        ...results
      ]);
    }
  };

  const resetUniversePoll = async () => {
    try {
      const result = await resetPoll();
      setResults([
        {
          timestamp: Date.now(),
          success: result,
          text: `Poll reset`
        },
        ...results
      ]);
    } catch (e) {
      setResults([
        {
          timestamp: Date.now(),
          success: false,
          text: `Error when resetting poll`
        },
        ...results
      ]);
    }
  };

  const setDashboardMode = async mode => {
    try {
      const result = await setMode(mode);
      setResults([
        {
          timestamp: Date.now(),
          success: result,
          text: `Set Dashboard mode ${mode.mode}`
        },
        ...results
      ]);
    } catch (e) {
      setResults([
        {
          timestamp: Date.now(),
          success: false,
          text: `Error when setting Dashboard mode`
        },
        ...results
      ]);
    }
  };

  const setArMode = async mode => {
    try {
      const result = await setMode(mode);
      setResults([
        {
          timestamp: Date.now(),
          success: result,
          text: `Set AR mode ${mode.mode}`
        },
        ...results
      ]);
    } catch (e) {
      setResults([
        {
          timestamp: Date.now(),
          success: false,
          text: `Error when setting Dashboard mode`
        },
        ...results
      ]);
    }
  };

  const setCarMode = async (mode) => {
    try {
      const result = await setMode(mode);
      setResults([
        {
          timestamp: Date.now(),
          success: result,
          text: `Set Car mode ${mode.mode}`
        },
        ...results,
      ]);
    } catch (e) {
      setResults([
        {
          timestamp: Date.now(),
          success: false,
          text: `Error when setting Car mode`
        },
        ...results,
      ]);
    }
  };

  const setVideoMode = async (mode) => {
    try {
      const result = await setMode(mode);
      setResults([
        {
          timestamp: Date.now(),
          success: result,
          text: `Set Video ${mode.mode} ${mode.data.videoId}`
        },
        ...results,
      ])
    } catch (e) {
      setResults([
        {
          timestamp: Date.now(),
          success: false,
          text: `Error when setting Video mode`
        },
        ...results,
      ]);
    }
  };

  const setThankYouMode = async (mode) => {
    try {
      const result = await setMode(mode);
      setResults([
        {
          timestamp: Date.now(),
          success: result,
          text: `Set Thank You`
        },
        ...results,
      ])
    } catch (e) {
      setResults([
        {
          timestamp: Date.now(),
          success: false,
          text: `Error when setting Thank You mode`
        },
        ...results,
      ]);
    }
  };

  return (
    <div className={styles.admin}>
      <ul className={styles.actions}>
        <li>
          <h1 className={styles.title}>Admin</h1>
        </li>
        <li className={styles.video}>
          <button
            className={styles.button}
            onClick={() => setVideoMode({mode: 'video', data: {videoId: 'keynote-xebicon-intro.mp4'}})}
          >
            Video (keynote-xebicon-intro)
          </button>
        </li>
        <li className={styles.dashboard}>
          <button
            className={styles.button}
            onClick={() => setDashboardMode({mode: 'past', data: {carId: 3}})}
          >
            Mode Past (3)
          </button>
        </li>
        <li className={styles.car}>
          <button
            className={styles.button}
            onClick={() => setCarMode({mode: 'stop', data: {carId: 3}})}>
            Car Stop (3)
          </button>
        </li>
        <li className={styles.dashboard}>
          <button
            className={styles.button}
            onClick={() => setDashboardMode({mode: 'present', data: {carId: 3}})}
          >
            Mode Present (3)
          </button>
        </li>
        <li className={styles.car}>
          <button
            className={styles.button}
            onClick={() => setCarMode({mode: 'ai', data: {carId: 3}})}>
            Car AI (3)
          </button>
        </li>
        <li className={styles.car}>
          <button
            className={styles.button}
            onClick={() => setCarMode({mode: 'faster', data: {carId: 3}})}>
            Car Faster (3)
          </button>
        </li>
        <li className={styles.car}>
          <button
            className={styles.button}
            onClick={() => setCarMode({mode: 'slower', data: {carId: 3}})}>
            Car Slower (3)
          </button>
        </li>
        <li className={styles.video}>
          <button
            className={styles.button}
            onClick={() => setVideoMode({mode: 'video', data: {videoId: 'keynote-xebicon-past-to-now.mp4'}})}
          >
            Video (keynote-xebicon-past-to-now)
          </button>
        </li>
        <li className={styles.dashboard}>
          <button
            className={styles.button}
            onClick={() => setDashboardMode({mode: 'present', data: {carId: 1}})}
          >
            Mode Present (1)
          </button>
        </li>
        <li className={styles.car}>
          <button
            className={styles.button}
            onClick={() => setCarMode({mode: 'ai', data: {carId: 1}})}>
            Car AI (1)
          </button>
        </li>
        <li className={styles.car}>
          <button
            className={styles.button}
            onClick={() => setCarMode({mode: 'stop', data: {carId: 1}})}>
            Car Stop (1)
          </button>
        </li>
        <li className={styles.car}>
          <button
            className={styles.button}
            onClick={() => setCarMode({mode: 'faster', data: {carId: 1}})}>
            Car Faster (1)
          </button>
        </li>
        <li className={styles.car}>
          <button
            className={styles.button}
            onClick={() => setCarMode({mode: 'slower', data: {carId: 1}})}>
            Car Slower (1)
          </button>
        </li>
        <li className={styles.dashboard}>
          <button
            className={styles.button}
            onClick={() => setDashboardMode({mode: 'vote'})}
          >
            Mode Vote
          </button>
        </li>
        <ul className={styles.poll}>
          <li>
            <button
              className={styles.button}
              onClick={() => vote({universe: 1, platform: 'android'})}
            >
              Vote universe 1 (Android)
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onClick={() => vote({universe: 2, platform: 'android'})}
            >
              Vote universe 2 (Android)
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onClick={() => vote({universe: 1, platform: 'ios'})}
            >
              Vote universe 1 (iOS)
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onClick={() => vote({universe: 2, platform: 'ios'})}
            >
              Vote Universe 2 (iOS)
            </button>
          </li>
        </ul>
        <ul className={styles.controlPoll}>
          <li>
            <button className={styles.button} onClick={stopUniversePoll}>
            <span role="img" aria-label="stop">
              ⚠️
            </span>{' '}
              Stop poll
            </button>
          </li>
          <li>
            <button className={styles.button} onClick={resetUniversePoll}>
            <span role="img" aria-label="reset">
              ⚠️
            </span>{' '}
              Reset poll
            </button>
          </li>
        </ul>
        <li className={styles.dashboard}>
          <button
            className={styles.button}
            onClick={() => setDashboardMode({mode: 'future', data: {carId: 1}})}
          >
            Mode Future (3)
          </button>
        </li>
        <ul className={styles.ar}>
          <li>
            <button
              className={styles.button}
              onClick={() => setArMode({mode: 'city'})}
            >
              AR City
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onClick={() => setArMode({mode: 'cityOverboard'})}
            >
              AR City Overboard
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onClick={() => setArMode({mode: 'cityNike'})}
            >
              AR City Nike
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onClick={() => setArMode({mode: 'unicorn'})}
            >
              AR Unicorn
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onClick={() => setArMode({mode: 'minecraft'})}
            >
              AR Minecraft
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onClick={() => setArMode({mode: 'obstacle', data: {active: true}})}
            >
              AR Obstacle ON
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onClick={() => setArMode({mode: 'obstacle', data: {active: false}})}
            >
              AR Obstacle OFF
            </button>
          </li>
        </ul>
        <li className={styles.thankyou}>
          <button
            className={styles.button}
            onClick={() => setThankYouMode({mode: 'thankyou'})}
          >
            Thank You
          </button>
        </li>
      </ul>
      <ResultConsole results={results} />
      <SSEProvider endpoint={`${process.env.REACT_APP_BACKEND_HOST}/universes`}>
        <SSEProvider endpoint={`${process.env.REACT_APP_BACKEND_HOST}/modes`}>
          <SseConsole />
        </SSEProvider>
      </SSEProvider>
    </div>
  );
};
