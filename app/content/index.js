import $ from 'jquery'
import Handlebars from 'handlebars'

import mainStyles from './main.css'

import credits from './templates/credits.html'
import averageMarksTable from './templates/averageMarksTable.tpl.js'
import coursePopup from './templates/coursePopup.tpl.js'

import Popup from 'shared/Popup'
import { get } from 'shared/DirtyRest'
import Courseoff from 'shared/Courseoff'
import * as Extract from 'shared/Extract'

Courseoff.on('pageLoaded', () => {
  onHoverOverCourseInList()
  $('.calendar-panel > .noprint').append(credits)
})

Courseoff.on('courseAdded', course => {
  placeAverageMarksTable($(course))
})

Courseoff.on('courseBlockAdded', courseBlock => {
  $(courseBlock).on('mouseenter', e => {
    $('.course-popup').remove()
    const courseInfo1 = Extract.courseFromCourseBlock(courseBlock)
    const sub = Courseoff.on('popupAdded', popup => {
      Courseoff.off(sub)
      const courseInfo2 = Extract.courseFromPopup(popup)
      let course = {
        ...courseInfo1,
        ...courseInfo2
      }
      get(`http://courseoffbuddy.tk/prof/${course.instructorId}`)
        .done(prof => {
          const professorStatsTable = averageMarksTable(prof.averageMarks)
          const html = coursePopup({ course, prof, professorStatsTable })
          console.log(course, prof)
          $('body').append($(html).css({ top: e.pageY, left: e.pageX + 20 }))
        })
        .fail(({ url, statusText }) => console.warn(statusText, url))
    })
  })
})

function placeAverageMarksTable(context) {
  let courseId = context.find('.name').text().split('-')[0].replace(/\s/g, '')
  get(`http://courseoffbuddy.tk/course/${courseId}`)
    .done(course => {
      const color = Extract.colorFromCourseInfoContainer(context[0])
      let template = averageMarksTable({
        ...course.averageMarks,
        color
      })
      $(template).hide().insertBefore(context.find('.table')).fadeIn()
    })
    .fail(({ url, statusText }) => console.warn(statusText, url))
}

function onHoverOverCourseInList() {
  $('.course-list > .course-info-container').on('mouseenter', function () {
    $(this).off()
    placeAverageMarksTable($(this))
  })
}
