import React, { PropTypes } from 'react';
import styles from './averageMarksTable.css';

const AverageMarksTable = (props) => {
  const { distribution } = props;

  if (!distribution) {
    return (
      <div>Loading...</div>
    );
  }

  if (distribution.errorMessage) {
    return (
      <div>{distribution.errorMessage}</div>
    );
  }

  return (
    <table className={styles.table}>
      <tbody>
        <tr className={styles.row}>
          <th>GPA</th>
          <th>A</th>
          <th>B</th>
          <th>C</th>
          <th>D</th>
          <th>F</th>
        </tr>
        <tr>
          <td>{distribution.gpa}</td>
          <td>{distribution.a}%</td>
          <td>{distribution.b}%</td>
          <td>{distribution.c}%</td>
          <td>{distribution.d}%</td>
          <td>{distribution.f}%</td>
        </tr>
      </tbody>
    </table>
  );
};

AverageMarksTable.propTypes = {
  distribution: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default AverageMarksTable;
