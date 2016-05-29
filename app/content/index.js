import $ from 'jquery'
import Handlebars from 'handlebars'
import styles from 'content/main.css'

import credits from 'content/components/credits.html'
import averageMarksTable from 'content/components/averageMarksTable/averageMarksTable.js'
import coursePopup from 'content/components/coursePopup/coursePopup.js'

import Popup from 'shared/Popup'
import { get } from 'shared/DirtyRest'
import Courseoff from 'shared/Courseoff'
import * as Extract from 'shared/Extract'
import * as Hydrate from 'shared/Hydrate'

// Courseoff.on('pageLoaded', () => {
//   onHoverOverCourseInList()
//   $('.calendar-panel > .noprint').append(credits)
// })
//
// Courseoff.on('courseAdded', course => {
//   placeAverageMarksTable($(course))
// })
//
// Courseoff.on('courseBlockAdded', courseBlock => {
//   $(courseBlock).on('mouseenter', e => {
//     const courseInfo1 = Extract.courseFromCourseBlock(courseBlock)
//     const sub = Courseoff.on('popupAdded', popup => {
//       console.info('popupAdded!')
//       Courseoff.off(sub)
//
//       const courseInfo2 = Extract.courseFromPopup(popup)
//
//       let course = {
//         ...courseInfo1,
//         ...courseInfo2
//       }
//
//       let prof = {}
//       let profStatsTable = {}
//       let courseStatsTable = {}
//
//       const color = Extract.colorFromCourseBlock(courseBlock)
//       const html = coursePopup({ course })
//
//       Popup.create(html, courseBlock)
//
//       get(`http://courseoffbuddy.tk/course/${course.name}`)
//         .done(({ details, averageMarks }) => {
//           course = { ...course, averageMarks, details }
//           courseStatsTable = averageMarksTable(averageMarks)
//           let html = coursePopup({ course, prof, profStatsTable, courseStatsTable }, color)
//           Popup.update(html)
//         })
//
//       get(`http://courseoffbuddy.tk/prof/${course.instructorId}`)
//         .done(p => {
//           prof = p
//           profStatsTable = averageMarksTable(p.averageMarks)
//           let html = coursePopup({ course, prof, profStatsTable, courseStatsTable }, color)
//           Popup.update(html)
//         })
//     })
//   })
//   // $(courseBlock).on('mouseleave', e => Popup.destroy())
// })
//
// function placeAverageMarksTable(context) {
//   let courseId = context.find('.name').text().split('-')[0].replace(/\s/g, '')
//   get(`http://courseoffbuddy.tk/course/${courseId}`)
//     .done(course => {
//       let template = averageMarksTable({ ...course.averageMarks })
//       const color = Extract.colorFromCourseInfoContainer(context[0])
//       Hydrate.courseInfoContainer(context, template, color)
//     })
//     .fail(({ url, statusText }) => console.warn(statusText, url))
// }
//
// function onHoverOverCourseInList() {
//   $('.course-list > .course-info-container').on('mouseenter', function () {
//     $(this).off()
//     placeAverageMarksTable($(this))
//   })
// }
