import $ from 'jquery'
import Handlebars from 'handlebars'

import mainStyles from './main.css'
import credits from './templates/credits.html'
import averageMarksTable from './templates/averageMarksTable.html'

import { dirtyGet } from 'shared/dirtyRest'
import { RGBtoRGBA } from 'shared/ColorUtilities'
import PageEvents from 'shared/PageEvents'

PageEvents.onPageLoaded(() => {
  $('.course-list > .course-info-container').on('mouseover', function () {
    $(this).off()
    let courseId = $(this).find('.name').text().split('-')[0].replace(/\s/g, '')
    dirtyGet(`http://courseoffbuddy.tk/course/${courseId}`)
      .done(({ data: course }) => {
        let color = $(this).css('border-left-color')
        color = RGBtoRGBA(color, '0.15')
        let template = Handlebars.compile(averageMarksTable)({
          ...course.averageMarks,
          color
        })
        $(template).hide().insertBefore($(this).find('.table')).fadeIn()
      })
      .fail(({ url, statusText }) => console.warn(statusText, url))
  })
})

PageEvents.onCourseAdded(() => {
  console.info('COURSE ADDED!')
})

$('.calendar-panel > .noprint').append(credits)
