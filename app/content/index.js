import $ from 'jquery'
import Handlebars from 'handlebars'

import mainStyles from 'content/main.css'

import credits from 'content/templates/credits.html'
import averageMarksTable from 'content/templates/averageMarksTable.tpl.js'
import coursePopup from 'content/templates/coursePopup.tpl.js'

import Popup from 'shared/Popup'
import { get } from 'shared/DirtyRest'
import Courseoff from 'shared/Courseoff'
import * as Extract from 'shared/Extract'
import * as Hydrate from 'shared/Hydrate'

Courseoff.on('pageLoaded', () => {
  onHoverOverCourseInList()
  $('.calendar-panel > .noprint').append(credits)
})

Courseoff.on('courseAdded', course => {
  placeAverageMarksTable($(course))
})

Courseoff.on('courseBlockAdded', courseBlock => {
  $(courseBlock).on('mouseenter', e => {
    Popup.destroy()
    const courseInfo1 = Extract.courseFromCourseBlock(courseBlock)
    const sub = Courseoff.on('popupAdded', popup => {
      const courseInfo2 = Extract.courseFromPopup(popup)
      let course = {
        ...courseInfo1,
        ...courseInfo2
      }

      let html = coursePopup({ course })

      const coords = { ...$(courseBlock).offset() }
      const width = $(courseBlock).width()
      const popupPos = { top: coords.top, left: coords.left + width }

      Popup.create(html, popupPos)

      get(`http://courseoffbuddy.tk/prof/${course.instructorId}`)
        .done(prof => {
          const professorStatsTable = averageMarksTable(prof.averageMarks)
          html = coursePopup({ course, prof, professorStatsTable })
          // console.log(course, prof)
          Popup.update(html)
        })
        .fail(({ url, statusText }) => console.warn(statusText, url))
    })
  })
  $(courseBlock).on('mouseleave', e => Popup.destroy())
})

function placeAverageMarksTable(context) {
  let courseId = context.find('.name').text().split('-')[0].replace(/\s/g, '')
  get(`http://courseoffbuddy.tk/course/${courseId}`)
    .done(course => {
      let template = averageMarksTable({ ...course.averageMarks })
      const color = Extract.colorFromCourseInfoContainer(context[0])
      Hydrate.courseInfoContainer(context, template, color)
    })
    .fail(({ url, statusText }) => console.warn(statusText, url))
}

function onHoverOverCourseInList() {
  $('.course-list > .course-info-container').on('mouseenter', function () {
    $(this).off()
    placeAverageMarksTable($(this))
  })
}
