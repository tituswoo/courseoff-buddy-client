import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import Courseoff from 'shared/Courseoff';
import AverageMarksTable from 'content/components/AverageMarksTable';
import AverageMarksTableForCourseList from 'content/components/AverageMarksTableForCourseList';
import { get } from 'shared/dirtyRest';

const course = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COURSE':
      return {
        title: action.title,
        color: action.color,
        id: action.id,
      };
    default:
      return state;
  }
};

const courses = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COURSE':
      return [
        ...state,
        course(undefined, action),
      ];
    default:
      return state;
  }
};

const distribution = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DISTRIBUTION':
      return {
        id: action.id,
        a: action.a,
        b: action.b,
        c: action.c,
        d: action.d,
        f: action.f,
        gpa: action.gpa,
      };
    case 'ADD_DISTRIBUTION_ERROR':
      return {
        id: action.id,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

const distributions = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DISTRIBUTION':
    case 'ADD_DISTRIBUTION_ERROR':
      return [
        ...state,
        distribution(undefined, action),
      ];
    default:
      return state;
  }
};

const popup = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_POPUP':
      return state;
    case 'HIDE_POPUP':
      return state;
    default:
      return state;
  }
};

const courseoffBuddy = combineReducers({
  courses,
  distributions,
  popup,
});

const store = createStore(courseoffBuddy);

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
        errorMessage: 'Sorry, no data available :('
      });
    });
}

Courseoff.on('courseAdded', course => {
  console.log('COURSE ADDED');
  hydrateCourseInCourseList(course);
});

Courseoff.on('workspaceChanged', () => {
  let courses = document.querySelectorAll('.schedule-panel .course-list .course-info-container');
  courses = [...courses];

  courses.forEach(course => {
    hydrateCourseInCourseList(course);
  });
});

// // import React from 'react'
// // import ReactDOM from 'react-dom'

// // import { createStore } from 'redux'
// // import { connect } from 'react-redux'

// //
// // import { createDevTools } from 'redux-devtools'
// // import { LogMonitor } from 'redux-devtools-log-monitor'
// //
// // import { configureStore } from 'content/store/configureStore'
// // import Courseoff from 'shared/Courseoff'
// //
// // import AverageMarksTable from 'content/components/AverageMarksTable'
// // import DevTools from 'content/containers/DevTools'

// // let store = configureStore()

// // const addCourse = (course) => {
// //   return {
// //     type: 'ADD_COURSE',
// //     ...course
// //   }
// // }

// // const App = () => (
// //   <div>TESTING TESTING 123</div>
// // )

// // let reduxDebugToolsContainer = document.createElement('div')
// // document.body.appendChild(reduxDebugToolsContainer)
// // ReactDOM.render(<DevTools />, reduxDebugToolsContainer)
// // console.log(AverageMarksTable)

// /* const AverageMarksTableContainer = connect(
//   (state, ownProps) => {
//     console.log(ownProps)
//     return { marks: {} }
//   }
// )(AverageMarksTable)

// Courseoff.on('pageLoaded', () => {
//   let courses = document.querySelectorAll('.schedule-panel .course-list .course-info-container')
//   courses = [...courses]
//   courses.forEach(course => {
//     let c = {
//       title: course.querySelector('.name').innerText.trim(),
//       color: course.style.borderLeftColor
//     }
//     store.dispatch(addCourse(c))

//     let parentElement = course.querySelector('.course-table-container')
//     let beforeElement = parentElement.querySelector('.table')
//     let containerElement = document.createElement('div')
//     parentElement.insertBefore(containerElement, beforeElement)

//     ReactDOM.render(<AverageMarksTableContainer course={c.title} />, containerElement)
//   })
// })*/

// // let devToolsContainer = document.createElement('div')
// // document.body.appendChild(devToolsContainer)

// // let app = tree(<button>TESTING</button>)
// // render(app, devToolsContainer)

// // [...courses].forEach(course => {
// //   console.info(course)
// // })

// // Courseoff.on('pageLoaded', () => {
// //   onHoverOverCourseInList()
// //   $('.calendar-panel > .noprint').append(credits)
// // })
// //
// // Courseoff.on('courseAdded', course => {
// //   placeAverageMarksTable($(course))
// // })
// //
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
