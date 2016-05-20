import $ from 'jquery'
import Handlebars from 'handlebars'

import mainStyles from './main.css'
import credits from './templates/credits.html'
import averageMarksTable from './templates/averageMarksTable.html'

import { dirtyGet } from 'shared/dirtyRest'
import { RGBtoRGBA } from 'shared/ColorUtilities'
import Courseoff from 'shared/Courseoff'

Courseoff.on('pageLoaded', () => {
  onHoverOverCourseInList()
  $('.calendar-panel > .noprint').append(credits)
})

Courseoff.on('courseAdded', course => {
  placeAverageMarksTable($(course))
})

Courseoff.on('popupAdded', popup => {
  popup = $(popup)
  const course = extractCourseInfoFromPopup(popup)
})

Courseoff.on('courseBlockAdded', courseBlock => {
  $(courseBlock).on('mouseenter', e => {
    const courseInfo1 = extractCourseInfoFromCourseBlock(courseBlock)
    const sub = Courseoff.on('popupAdded', popup => {
      const courseInfo2 = extractCourseInfoFromPopup(popup)
      let result = {
        ...courseInfo1,
        ...courseInfo2
      }
      console.info(result)
      Courseoff.off(sub)
    })
  })
})

function extractCourseInfoFromCourseBlock (courseBlock) {
  courseBlock = $(courseBlock)
  return {
    name: courseBlock.find('.course-content').text().replace(' - ', ''),
    location: courseBlock.find('.location').text()
  }
}

function extractCourseInfoFromPopup(popup) {
  const content = $(popup).find('.popover')
  let items = content.find('em')
  let course = {
    refNumber: items[0].innerText.trim(),
    section: items[1].innerText.trim(),
    creditHours: items[2].innerText.trim(),
    instructor: content.find('[data-visible="instr"]').find('em').text().trim(),
    location: content.find('[data-visible="location"]').find('em').text().trim()
  }
  return course
}

function placeAverageMarksTable(context) {
  let courseId = context.find('.name').text().split('-')[0].replace(/\s/g, '')
  dirtyGet(`http://courseoffbuddy.tk/course/${courseId}`)
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
