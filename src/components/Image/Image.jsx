import styles from "./Image.module.css";
import React from "react";

export default ({match}) => {
  return (
    <div className={styles.container}>
      <img alt={""} className={styles.image} src={`/${match.params.imageId}`} width="100%" />
    </div>
  );
};
