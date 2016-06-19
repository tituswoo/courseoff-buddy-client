import React, { PropTypes, Component } from 'react';
import styles from 'content/components/popup.css';

import AverageMarksTable from 'content/components/AverageMarksTable';

class Popup extends Component {
  componentDidUpdate() {
    const popup = this.popupContainer;
    if (popup) {
      const yTopPos = popup.getBoundingClientRect().top;
      const yBottomPos = yTopPos + popup.offsetHeight;

      if (yBottomPos > window.innerHeight) {
        const delta = yBottomPos - window.innerHeight;
        const yTopPosFinal = yTopPos - delta;
        this.props.dispatch({ type: 'UPDATE_POPUP', y: yTopPosFinal });
      }
    }
  }

  render() {
    const { visible, course, distributions, x, y } = this.props;
    const courseDistribution = distributions.filter(c => c.id === course.id)[0];

    if (!visible) {
      return false;
    }

    return (
      <div
        className={styles.popup}
        style={{
          top: y,
          left: x,
        }}
        ref={(c) => { this.popupContainer = c; }}
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
  }
}

// const Popup = (props) => {
//   const { visible, course, distributions, x, y } = props;

//   const courseDistribution = distributions.filter(c => c.id === course.id)[0];

//   if (!visible) {
//     return false;
//   }

//   let alignment = {};
//   // const alignFromBottom = 

//   if (alignFromBottom) {
//     alignment = {
//       bottom: 0,
//       left: x,
//     };
//   } else {
//     alignment = {
//       top: y,
//       left: x,
//     };
//   }

//   console.log(alignment);

//   return (

//   );
// };

Popup.propTypes = {
  course: PropTypes.object,
  distributions: PropTypes.array,
  x: PropTypes.number,
  y: PropTypes.number,
  visible: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default Popup;
