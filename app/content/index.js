import $ from 'jquery'
import Handlebars from 'handlebars'

import mainStyles from './main.css'
import credits from './templates/credits.html'
import averageMarksTable from './templates/averageMarksTable.html'

import { dirtyGet } from 'shared/dirtyRest'
import { RGBtoRGBA } from 'shared/ColorUtilities'
import PageEvents from 'shared/PageEvents'

PageEvents.onPageLoaded(() => {
  onHoverOverCourseInList()
  $('.calendar-panel > .noprint').append(credits)
})

PageEvents.onCourseAdded((course) => {
  placeAverageMarksTable($(course))
})

PageEvents.onPopupAdded((popup) => {
  popup = $(popup)
  popup.hide()
  const course = extractCourseInfoFromPopup(popup.html())
  console.info(course)
})

PageEvents.onCourseBlockAdded((courseBlock) => {
  $(courseBlock).on('mouseover', e => {
    let course = extractCourseInfoFromCourseBlock(courseBlock)
    console.info(course)
  })
})

function extractCourseInfoFromCourseBlock (courseBlock) {
  courseBlock = $(courseBlock)
  return {
    name: courseBlock.find('.course-content').text().replace(' - ', ''),
    location: courseBlock.find('.location').text()
  }
}

function extractCourseInfoFromPopup(html) {
  const content = $(html).find('.popover')
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
  $('.course-list > .course-info-container').on('mouseover', function () {
    $(this).off()
    placeAverageMarksTable($(this))
  })
}
