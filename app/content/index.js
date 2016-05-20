import $ from 'jquery'
import Handlebars from 'handlebars'

import mainStyles from './main.css'
import coursePopupStyles from './coursePopup.css'

import credits from './templates/credits.html'
import averageMarksTable from './templates/averageMarksTable.html'
import coursePopup from './templates/coursePopup.html'

import { get } from 'shared/DirtyRest'
import { RGBtoRGBA } from 'shared/ColorUtilities'
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
    const courseInfo1 = Extract.courseFromCourseBlock(courseBlock)
    const sub = Courseoff.on('popupAdded', popup => {
      Courseoff.off(sub)
      const courseInfo2 = Extract.courseFromPopup(popup)
      let course = {
        ...courseInfo1,
        ...courseInfo2
      }
      get(`http://courseoffbuddy.tk/prof/${course.instructorId}`)
        .done(({ data: prof }) => {
          const html = Handlebars.compile(coursePopup)({
            course,
            prof
          })
          console.log(course)
          $('body').append($(html))
        })
        .fail(({ url, statusText }) => console.warn(statusText, url))
    })
  })
})

function placeAverageMarksTable(context) {
  let courseId = context.find('.name').text().split('-')[0].replace(/\s/g, '')
  get(`http://courseoffbuddy.tk/course/${courseId}`)
    .done(({ data: course }) => {
      let color = context.css('border-left-color')
      color = RGBtoRGBA(color, '0.15')
      let template = Handlebars.compile(averageMarksTable)({
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
