import $ from 'jquery'
import Handlebars from 'handlebars'

import mainStyles from './main.css'
import credits from './templates/credits.html'
import averageMarksTable from './templates/averageMarksTable.html'

import { dirtyGet } from 'shared/dirtyRest'
import { RGBtoRGBA } from 'shared/ColorUtilities'
import PageEvents from 'shared/PageEvents'

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

PageEvents.onPageLoaded(() => {
  $('.course-list > .course-info-container').on('mouseover', function () {
    $(this).off()
    placeAverageMarksTable($(this))
  })
})

PageEvents.onPageLoaded(() => {
  $('.calendar-panel > .noprint').append(credits)
})

PageEvents.onCourseAdded((course) => {
  placeAverageMarksTable($(course))
})
