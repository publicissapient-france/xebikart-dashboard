import React from 'react';
import classnames from 'classnames';

import CarInfos from '../CarInfos/CarInfos';

import styles from './Cars.module.css';

export default ({className}) => {
  return (
    <div className={classnames(styles.container, className)}>
      <CarInfos className={styles.carinfos} />
    </div>
  );
}