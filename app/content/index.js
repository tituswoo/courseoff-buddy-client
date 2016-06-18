import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Courseoff from 'shared/Courseoff';
import AverageMarksTableForCourseList from 'content/components/AverageMarksTableForCourseList';
import Popup from 'content/components/Popup';
import { get } from 'shared/dirtyRest';
import rootReducer from 'content/reducers';
import { courseFromPopup, courseFromCourseBlock } from 'shared/Extract';

const store = createStore(rootReducer);

store.subscribe(() => console.log(store.getState()));

function hydrateCourseInCourseList(course) {
  const title = course.querySelector('.name').innerText.trim();
  const color = course.style.borderLeftColor;
  const id = title.split('-')[0].replace(/\s/, '').trim();

  store.dispatch({
    type: 'ADD_COURSE',
    title, color, id,
  });

  const parentElement = course.querySelector('.course-table-container');
  const beforeElement = parentElement.querySelector('.table');
  const containerElement = document.createElement('div');
  parentElement.insertBefore(containerElement, beforeElement);

  store.subscribe(() => {
    ReactDOM.render(
      <AverageMarksTableForCourseList
        distribution={store.getState().distributions.filter(d => d.id === id)[0]}
        color={color} />, containerElement
    );
  });

  get(`http://courseoffbuddy.tk/course/${id}`)
    .done(course => {
      store.dispatch({
        type: 'ADD_DISTRIBUTION',
        id,
        ...course.averageMarks,
      });
    })
    .fail(({ url, statusText }) => {
      store.dispatch({
        type: 'ADD_DISTRIBUTION_ERROR',
        id,
        errorMessage: 'No data available for this course :('
      });
    });
}

Courseoff.on('courseAdded', course => {
  hydrateCourseInCourseList(course);
});

Courseoff.on('popupAdded', (popup) => {
  const data = courseFromPopup(popup);
  store.dispatch(Object.assign({}, data, { type: 'UPDATE_POPUP', visible: true }));
});

Courseoff.on('courseBlockAdded', (courseBlock) => {
  courseBlock.addEventListener('mouseenter', () => {
    const block = courseFromCourseBlock(courseBlock);
    store.dispatch(
      Object.assign({}, { type: 'UPDATE_POPUP' }, block)
    );
  });
});

Courseoff.on('workspaceChanged', () => {
  let courses = document.querySelectorAll('.schedule-panel .course-list .course-info-container');
  courses = [...courses];

  courses.forEach(course => {
    hydrateCourseInCourseList(course);
  });
});

Courseoff.on('pageLoaded', () => {
  const popupContainer = document.createElement('div');
  document.body.appendChild(popupContainer);

  store.subscribe(() => {
    const { distributions, popup } = store.getState();
    ReactDOM.render(
      <Popup
        course={popup}
        distributions={distributions}
      />,
      popupContainer
    );
  });
});

// // Courseoff.on('pageLoaded', () => {
// //   onHoverOverCourseInList()
// //   $('.calendar-panel > .noprint').append(credits)
// // })

// // Courseoff.on('courseBlockAdded', courseBlock => {
// //   $(courseBlock).on('mouseenter', e => {
// //     const courseInfo1 = Extract.courseFromCourseBlock(courseBlock)
// //     const sub = Courseoff.on('popupAdded', popup => {
// //       console.info('popupAdded!')
// //       Courseoff.off(sub)
// //
// //       const courseInfo2 = Extract.courseFromPopup(popup)
// //
// //       let course = {
// //         ...courseInfo1,
// //         ...courseInfo2
// //       }
// //
// //       let prof = {}
// //       let profStatsTable = {}
// //       let courseStatsTable = {}
// //
// //       const color = Extract.colorFromCourseBlock(courseBlock)
// //       const html = coursePopup({ course })
// //
// //       Popup.create(html, courseBlock)
// //
// //       get(`http://courseoffbuddy.tk/course/${course.name}`)
// //         .done(({ details, averageMarks }) => {
// //           course = { ...course, averageMarks, details }
// //           courseStatsTable = averageMarksTable(averageMarks)
// //           let html = coursePopup({ course, prof, profStatsTable, courseStatsTable }, color)
// //           Popup.update(html)
// //         })
// //
// //       get(`http://courseoffbuddy.tk/prof/${course.instructorId}`)
// //         .done(p => {
// //           prof = p
// //           profStatsTable = averageMarksTable(p.averageMarks)
// //           let html = coursePopup({ course, prof, profStatsTable, courseStatsTable }, color)
// //           Popup.update(html)
// //         })
// //     })
// //   })
// //   // $(courseBlock).on('mouseleave', e => Popup.destroy())
// // })
// //
// // function placeAverageMarksTable(context) {
// //   let courseId = context.find('.name').text().split('-')[0].replace(/\s/g, '')
// //   get(`http://courseoffbuddy.tk/course/${courseId}`)
// //     .done(course => {
// //       let template = averageMarksTable({ ...course.averageMarks })
// //       const color = Extract.colorFromCourseInfoContainer(context[0])
// //       Hydrate.courseInfoContainer(context, template, color)
// //     })
// //     .fail(({ url, statusText }) => console.warn(statusText, url))
// // }
// //
// // function onHoverOverCourseInList() {
// //   $('.course-list > .course-info-container').on('mouseenter', function () {
// //     $(this).off()
// //     placeAverageMarksTable($(this))
// //   })
// // }
