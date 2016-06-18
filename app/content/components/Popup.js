import React, { PropTypes } from 'react';
import styles from 'content/components/popup.css';

import AverageMarksTable from 'content/components/AverageMarksTable';

const Popup = (props) => {
  const { course, distributions, x, y } = props;

  const courseDistribution = distributions.filter(c => c.id === course.id)[0];

  return (
    <div
      className={styles.popup}
      style={{
        top: y,
        left: x,
      }}
    >
      <div className={styles.content}>
        <div
          className={styles.title}
          style={{ backgroundColor: course.color }}
        >
          <h2>{course.title}</h2>
          <div
            className={styles.courseStatsTable}
            style={{ color: 'black' }}
          >
            <AverageMarksTable distribution={courseDistribution} />
          </div>
        </div>
        <div>
          <div className={styles.details__row}>
            <span>INFO</span>
            <p>{course.details}</p>
          </div>
          <div className={styles.details}>
            <div className={styles.details__row}>
              <span>PROF</span>
              <p>{course.instructor}</p>
            </div>
            <div className={styles.details__row}>
              <span>LOC</span>
              <p>{course.location}</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.box}>
              <h3>
                {course.credits}
              </h3>
              <p>credits</p>
            </div>
            <div className={styles.box}>
              <h3>
                {course.ref}
              </h3>
              <p>course id</p>
            </div>
            <div className={styles.box}>
              <h3>
                {course.section}
              </h3>
              <p>section</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  course: PropTypes.object,
  distributions: PropTypes.array,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default Popup;
