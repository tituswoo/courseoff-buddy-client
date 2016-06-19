import React, { PropTypes } from 'react';
import styles from 'content/components/badge.css';

const Badge = (props) => {
  const { value } = props;
  return (
    <div className={styles.badge}>
      {value || '???'}
    </div>
  );
};

Badge.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Badge;
