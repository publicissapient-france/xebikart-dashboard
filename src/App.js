import React from 'react';

import Dashboard from './components/Dashboard/Dashboard';

import styles from './App.module.css';

import logo from './logo.png'

export default () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="Xebikart" />
      <Dashboard className={styles.dashboard} />
    </div>
  );
}
