var event = new Events();
var courses = new ArrayList();
var currentCourse = '';

event.onPageLoaded(function () {
	$('.course-list > .course-info-container').each(function () {
		var courseTitle = $(this).find('.name').text();
		downloadCourseStats(courseTitle);
	});
});

event.onResourcesLoaded(courses, function () {
	console.log('all assets finished loading successfully');
	// retrieve all coures information and store it in an array list.

	// keep track of what course is being hovered over in the  calendar view
	/*$('.calendar .course-box').mouseover(function () {
		currentCourse = $(this).find('.course-content').html().replace(' - ', '');
		console.log(currentCourse);
	});*/

	// add listeners for when mouse is hovered over the calendar tiles.
	$('.course-cal.pinned').mouseover(function () {
		var course = $(this).find('.course-content').html();
		currentCourse = course.replace(' - ', '');
		console.log(currentCourse);
	});

	// augment class popups with additional information.
	event.onPopupAdded(function (context) {
		// remove whatever was inserted in the popup before.
		$(context).find('#cb-class-info').remove();

		var course = courses.get(currentCourse).value;
		var body = $(context).find('.popover');
		var container = $('<div/>').attr('id', 'cb-class-info');

		// insert stuff onto the page:
		container.append($('<h5/>').html('Average Marks'));
		if (course && typeof course != 'undefined') {
			var gradeTable = makeAverageMarksTable(course.averageMarks);
			container.append(gradeTable);
		} else {
			container.append('<p>Sorry, no statistics are available for this course.</p>')
		}

		container.append($('<h5/>').html('Course Description'));
		if (course && course.details.description) {
			container.append($('<p/>').html(course.details.description));
		} else {
			var error = "Couldn't load description because the Gatech server is temporarily unavailable; ";
			error += "this seems to happens a lot! There's also a small chance that the course just doesn't exist in the database.";
			container.append($('<p/>').html(error));
		}		

		container.appendTo(body);
	});
});

event.onCourseAdded(function (context) {
	var courseTitle = $(context).find('.name').text();
	downloadCourseStats(courseTitle);
});

event.onCoursePinned(function (context) {
	$(context).on('hover', function () {
		var course = $(this).find('.course-content').html();
		currentCourse = course.replace(' - ', '');
		console.log(courses.get(currentCourse));
	});
});

event.onCourseUnpinned(function (context) {
	$(context).off(); // remove all event handlers.
});

function downloadCourseStats(courseTitle) {
	retrieve('search', {query: courseTitle}, function (results) {
		if (results.status === 404) {
			console.log('Nothing found for ' + courseTitle);
			courses.add(false); // needed to make sure onResourcesLoaded works.
		} else {
			var id = results[0].id;
			retrieve('course', {id: id}, function (course) {
				courses.add(course.title.replace(' ', ''), course);
				console.log(courses.getData());
			});
		}
	});
}

function makeAverageMarksTable(averages) {		
	// table to hold averageMarks
	var table = $('<table/>').addClass('average-marks-table');
	// header section
	var header = $('<tr/>');
	$('<th/>').text('GPA').appendTo(header);
	$('<th/>').text('A%').appendTo(header);
	$('<th/>').text('B%').appendTo(header);
	$('<th/>').text('C%').appendTo(header);
	$('<th/>').text('D%').appendTo(header);
	$('<th/>').text('F%').appendTo(header);
	// content section
	var body = $('<tr/>');
	$('<td/>').text(averages.gpa).appendTo(body);
	$('<td/>').text(averages.a).appendTo(body);
	$('<td/>').text(averages.b).appendTo(body);
	$('<td/>').text(averages.c).appendTo(body);
	$('<td/>').text(averages.d).appendTo(body);
	$('<td/>').text(averages.f).appendTo(body);
	// put everything into the table
	header.appendTo(table);
	body.appendTo(table);

	return table;
}

function retrieve(command, params, callback) {
	chrome.runtime.sendMessage({
		command: command,
		params: params
	}, callback);
}
