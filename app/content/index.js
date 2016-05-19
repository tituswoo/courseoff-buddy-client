import $ from 'jquery'
import Handlebars from 'handlebars'

import mainStyles from './main.css'

import credits from './templates/credits.html'
import averageMarksTable from './templates/averageMarksTable.html'

import { dirtyGet } from 'shared/dirtyRest'
import { RGBtoRGBA } from 'shared/ColorUtilities'
import PageEvents from 'shared/PageEvents'

// $('.course-list > .course-info-container').each(function () {
//   var courseTitle = $(this).find('.name').text();
//   var context = $(this);
//   downloadCourseStats(courseTitle, function (course) {
//     if (course) {
//       var color = context.css('border-left-color');
//       color = RGBtoRGBA(color, '0.15');
//       var table = makeAverageMarksTable(course.averageMarks, color).hide();
//       table.insertBefore(context.find('.table')).fadeIn();
//     }
//
//     if (coursesCount === counter) {
//       loadingScreen.hide();
//     } else {
//       counter += 1;
//     }
//   });
// });

PageEvents.onPageLoaded(() => {
  $('.course-list > .course-info-container').on('mouseover', function () {
    $(this).off()
    let courseId = $(this).find('.name').text().split('-')[0].replace(/\s/g, '')
    dirtyGet(`http://courseoffbuddy.tk/course/${courseId}`)
      .done(({ data: course }) => {
        console.info('course:', course)
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



// $('.course-list > .course-info-container').each(() => {
//   let courseTitle = $(this).find('.name').text()
//   let context = $(this)
//   console.info(courseTitle.trim())
//   dirtyGet(`http://courseoffbuddy.tk/search/${courseTitle.trim()}`)
//     .done(({ course: data }) => {
//       console.log('course:', course)
//       if (course) {
//         let color = context.css('border-left-color')
//         color = RGBtoRGBA(color, '0.15')
//         let table = makeAverageMarksTable(course.averageMarks, color).hide()
//         table.insertBefore(context.find('.table')).fadeIn()
//       }
//
//       if (coursesCount === counter) {
//         loadingScreen.hide()
//       } else {
//         counter += 1;
//       }
//     })
//     .fail(({ url, statusText }) => console.warn(statusText, url))
// })

$('.calendar-panel .noprint').append(credits)

// function downloadCourseStats(courseTitle, callback) {
//   search(courseTitle).done(results => {
//   		let id = results[0].id;
//   		retrieve('course', {id: id}, course => {
//   			if (course.status != '404') {
//   				courses.add(normalize(course.title), course)
//   				if (callback) callback(course)
//   			} else {
//   				courses.add(false)
//   				if (callback) callback(false)
//   			}
//   		})
// 	})
// }

function search(query) {
  return $.getJSON(`http://courseoffbuddy.tk/search/${query.trim()}`)
}

function getProf(id) {
  return $.getJSON(`http://courseoffbuddy.tk/prof/${id}`)
}

function getCourse(id) {
  return $.getJSON(`http://courseoffbuddy.tk/course/${id}`)
}

function makeAverageMarksTable(averages, color) {
	color = String(color) || 'initial';
	// table to hold averageMarks
	var table = $('<table/>').addClass('average-marks-table');
	table.css({
		backgroundColor: color
	});
	// header section
	var header = $('<tr/>');
	$('<th class="gpa" />').text('GPA').appendTo(header);
	$('<th class="a"/>').text('A%').appendTo(header);
	$('<th/>').text('B%').appendTo(header);
	$('<th/>').text('C%').appendTo(header);
	$('<th/>').text('D%').appendTo(header);
	$('<th/>').text('F%').appendTo(header);
	// content section
	var body = $('<tr/>');
	try {
		$('<td class="gpa"/>').text(averages.gpa).appendTo(body);
		$('<td class="a"/>').text(averages.a).appendTo(body);
		$('<td/>').text(averages.b).appendTo(body);
		$('<td/>').text(averages.c).appendTo(body);
		$('<td/>').text(averages.d).appendTo(body);
		$('<td/>').text(averages.f).appendTo(body);
	} catch (e) {
		return false;
	}
	// put everything into the table
	header.appendTo(table);
	body.appendTo(table);

	return $(table);
}
