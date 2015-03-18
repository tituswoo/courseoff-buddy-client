var event = new Events();
var courses = new ArrayList();
var currentCourse = '';

event.onPageLoaded(function () {
	// retrieve all coures information and store it in an array list.
	$('.course-list > .course-info-container').each(function () {
		var courseTitle = $(this).find('.name').text();
		downloadCourseStats(courseTitle);
	});

	// keep track of what course is being hovered over in the  calendar view
	$('.calendar .course-box').mouseover(function () {
		currentCourse = $(this).find('.course-content').html();
		console.log(currentCourse);
	});

	// augment class popups with additional information.
	event.onPopupAdded(function (context) {
		// remove whatever was inserted in the popup before.
		$(context).find('#cb-class-info').remove();



		/*retrieve('search', {query: courseName}, function (details) {
			var container = $('<div id="cb-class-info" />');
			container.append('<h5>HELLO THERE FRIEND</h5>');
			container.append('');
		});*/
	});
});

event.onCourseAdded(function (context) {
	var courseTitle = $(context).find('.name').text();
	downloadCourseStats(courseTitle);
});

event.onCourseRemoved(function (context) {
	console.log('course removed');
});

event.onCoursePinned(function (context) {
	console.log('course pinned');
	$(context).on('mouseenter', function () {
		var html = $(this).find('.course-content').html();
		console.log(html);
	});
});

event.onCourseUnpinned(function (context) {
	console.log('course removed');
	$(context).off();
});

function downloadCourseStats(courseTitle) {
	retrieve('search', {query: courseTitle}, function (results) {
		if (results.status === 404) {
			console.log('Nothing found for ' + courseTitle);
		} else {
			var id = results[0].id;
			retrieve('course', {id: id}, function (course) {
				courses.add(course.title, course);
				console.log(courses.getData());
			});
		}
	});
}

function retrieve(command, params, callback) {
	chrome.runtime.sendMessage({
		command: command,
		params: params
	}, callback);
}

// 	console.log($('.course-box').html());

// 	$('body').observe('childList', '.popover.tip', function(record) {
// 		if (record.addedNodes[0] != null) {
// 			// the pop up was added
// 			// console.log(record.addedNodes[0]);
// 			var context = $(record.addedNodes[0]);
// 			var text = $(record.addedNodes[0]).find('.popover').html();
// 			//console.log(text);
// 		} else {
// 			// the pop up was removed
// 			// console.log(record.removedNodes[0]);
// 		}
// 	});
// });

// $(document).ready(function () {
// 	initialize();
// });

// function initialize() {
	
// 	addAverageClassRanks();
// 	addEventListeners();
// }

// function addEventListeners() {
// 	courseAddedFromUIListener();
// 	// scheduleViewSwitchedListener();
// }

// function addAverageClassRanks() {
// 	$('.course-list .course-info-container .header').each(function () {
// 		addAverageClassRank($(this).parent());
// 	});	
// }

// function courseAddedFromUIListener() {
// 	$('.course-list').observe('childList', '.course-info-container', function (record) {
// 		if (record.addedNodes.length > 0) {
// 			// a course was added!
// 			var addedCourse = $(record.addedNodes[0]);
// 			addAverageClassRank(addedCourse);
// 			console.log('course was added');
// 		}
// 	});
// }

// function workspaceChangedListener() {
// 	$('#course-list').observe('childList', '.course-info-container', function (record) {
// 		console.log('course list changed');
// 	});
// }

// function scheduleViewSwitchedListener() {
// 	$('.dropdown-menu a').click(function () {
// 		setTimeout(function () {
// 			courseAddedFromUIListener();
// 		}, 400);		
// 	});
// }

// function addAverageClassRank(course) {
// 	var courseName = course.find('.name').text();
// 	retrieve('search', {query: courseName}, function (data) {
// 		var courseID = data[0].id;
// 		retrieve('course', {id: courseID}, function (data) {
// 			var averages = data.averageMarks;
			
// 			// table to hold averageMarks
// 			var table = $('<table/>').addClass('course-addon');

// 			// header section
// 			var header = $('<tr/>');
// 			$('<th/>').text('GPA').appendTo(header);
// 			$('<th/>').text('A%').appendTo(header);
// 			$('<th/>').text('B%').appendTo(header);
// 			$('<th/>').text('C%').appendTo(header);
// 			$('<th/>').text('D%').appendTo(header);
// 			$('<th/>').text('F%').appendTo(header);

// 			// content section
// 			var body = $('<tr/>');
// 			$('<td/>').text(averages.gpa).appendTo(body);
// 			$('<td/>').text(averages.a).appendTo(body);
// 			$('<td/>').text(averages.b).appendTo(body);
// 			$('<td/>').text(averages.c).appendTo(body);
// 			$('<td/>').text(averages.d).appendTo(body);
// 			$('<td/>').text(averages.f).appendTo(body);

// 			// put everything into the table
// 			header.appendTo(table);
// 			body.appendTo(table);
// 			course.find('.header').append(table);
// 		});
// 	});
// }

// function courseClicked(course) {
// 	// console.log($(course).find('.header').append("<p>HELLO</p>"));
// 	// $(course).find('tbody td.instructor').each(function () {
// 	// 	var profName = $(this).text();
		
// 	// 	chrome.runtime.sendMessage({
// 	// 		command: 'search',
// 	// 		params: {
// 	// 			query: profName
// 	// 		}
// 	// 	}, function (data) {
// 	// 		var profID = data[0].id;
// 	// 		chrome.runtime.sendMessage({
// 	// 			command: 'prof',
// 	// 			params: {
// 	// 				id: profID
// 	// 			}
// 	// 		}, function (data) {
				
// 	// 		});
// 	// 	});
// 	// });
// }
