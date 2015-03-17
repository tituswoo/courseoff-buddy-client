function Events() {}

Events.prototype.onPageLoaded = function (callback) {
	var checkInterval = setInterval(function () {
		console.log('Waiting for page to finish loading...');
		if ($('.course-info-container').html() != undefined) {
			clearInterval(checkInterval);
			callback();
		}
	}, 400);
};

Events.prototype.onPopupAdded = function (callback) {
	$('body').observe('childList', '.popover.tip', function(record) {
		if (record.addedNodes[0] != null) {
			var context = $(record.addedNodes[0]);
			callback(context);
		} else {
		}
	});
};

var event = new Events();
event.onPageLoaded(addEnhancements);
var courseName = '';

function addEnhancements() {
	console.log('Page finished loading!');

	$('.course-list .course-info-container').each(function () {
		var courseName = $(this).find('.header > .name').text();
	});

	$('.course-box').hover(function () {
		courseName = $(this).find('.course-content').html();
	});

	event.onPopupAdded(function (context) {
		$(context).find('#cb-class-info').remove();
		$(context).find('.body').after('<div id="cb-class-info"><h5>HI THERE</h5><p>Stuff</p></div>');
		console.log(context.html());
	});
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

// function retrieve(command, params, callback) {
// 	chrome.runtime.sendMessage({
// 		command: command,
// 		params: params
// 	}, callback);
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
