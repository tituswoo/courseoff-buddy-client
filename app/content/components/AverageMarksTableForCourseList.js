import React, { PropTypes } from 'react';
import AverageMarksTable from 'content/components/AverageMarksTable';
import { RGBtoRGBA } from 'shared/ColorUtilities';

const AverageMarksTableForCourseList = (props) => {
  const { distribution, color } = props;
  return (
    <div
      style={{
        padding: '2px',
        paddingLeft: '27px',
        backgroundColor: RGBtoRGBA(color, 0.2),
        borderTop: '1px solid #ddd',
        fontSize: '11px',
      }}
    >
      <AverageMarksTable distribution={distribution} />
    </div>
  );
};

AverageMarksTableForCourseList.propTypes = {
  distribution: PropTypes.object,
  color: PropTypes.string,
};

export default AverageMarksTableForCourseList;
