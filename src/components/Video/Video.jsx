import React from "react";

import styles from './Video.module.css';

export default ({match}) => {
  const url = `https://storage.googleapis.com/xebikart-video/${match.params.videoId}`;
  return (
    <video className={styles.video} width="100%" autoPlay key={url}>
      <source src={url} />
    </video>
  );
}
