import React from 'react';

import styles from './RaceStatus.module.css';

export default ({status}) => <div className={styles[status]}>{status}</div>