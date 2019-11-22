import React from "react";

import styles from "./CarVideo.module.css";

export default ({ match }) => {
  return (
    <div className={styles.container}>
      <img
        alt="car-video"
        className={styles.container__image}
        src={`${process.env.REACT_APP_BACKEND_HOST}/car/video?carId=${match.params.carId}`}
      />
    </div>
  );
};
