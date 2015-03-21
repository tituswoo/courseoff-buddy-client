chrome.extension.sendMessage({type: 'showPageAction'});

var event = new Events();
var courses = new ArrayList();
var professors = new ArrayList();
var professorsQueue = new ArrayList();
var currentCourse = '';
var loadingScreen = new LoadingScreen($('body'));

event.onResourcesLoaded(courses, function () {
	$('.instructor').each(function () {
		var name = $(this).html();
		getProfessorStats(name, function (data) {
			if (data.status != '404') {
				professors.add(name, data);
			}
		});
	});
});

event.onCourseAdded(function (context) {
	setTimeout(function () {
		var html = $(context).find('.instructor').each(function () {
			var name = $(this).html();
			getProfessorStats(name, function (data) {
				if (data.status != '404') {
					professors.add(name, data);
				}
			});
		});
	}, 500);	
});

$('body').on('click', '.dropdown-menu a', function () {
	window.location.reload();
});

$('body').on('mouseenter', '.course-box', function () {
	var course = $(this).find('.course-content').html();
	currentCourse = course.replace(' - ', '');
});

$('body').on('mouseenter', '.instructor', function () {
	$(this).tooltipster({
		onlyOne: true,
		position: 'left',
		theme: 'tooltipster-courseoff-light',
		animation: 'fade',
		speed: 0,
		delay: 0,
		interactive: true,
		functionBefore: function (origin, continueTooltip) {
			var name = normalize($(this).html());
			var data = professors.get(name);

			if (data) {
				origin.tooltipster('content', makeProfessorPillbox(data.value));
			} else {
				origin.tooltipster('content', $('<p>No information found for this instructor.</p>'));
			}
			continueTooltip();	
		}
	});
	$(this).tooltipster('show');
});


event.onPageLoaded(function () {
	if (numCourses() > 0) {
		loadingScreen.show();
	}

	var coursesCount = numCourses();
	var counter = 1;

	if (coursesCount > 0) {
		$('.course-list > .course-info-container').each(function () {
			var courseTitle = $(this).find('.name').text();
			var context = $(this);
			downloadCourseStats(courseTitle, function (course) {
				if (course) {
					var color = context.css('border-left-color');
					color = RGBtoRGBA(color, '0.15');
					var table = makeAverageMarksTable(course.averageMarks, color).hide();
					table.insertBefore(context.find('.table')).fadeIn();
				}				

				if (coursesCount === counter) {
					loadingScreen.hide();
				} else {
					counter += 1;
				}
			});
		});
	}
});

event.onResourcesLoaded(courses, function () {
	// augment class popups with additional information.
	event.onPopupAdded(function (context) {
		// remove whatever was inserted in the popup before.
		$(context).find('#cb-class-info').remove();

		var course = courses.get(currentCourse).value;		
		var body = $(context).find('.popover');
		var container = $('<div/>').attr('id', 'cb-class-info');

		// insert stuff onto the page:
		container.append($('<h5/>').html('Course Averages'));
		if (course && typeof course != 'undefined') {
			var gradeTable = makeAverageMarksTable(course.averageMarks);
			if (gradeTable)	container.append(gradeTable);
		} else {
			container.append('<p>Sorry, no statistics are available for this course.</p>')
		}

		container.append($('<h5/>').html('Course Description'));
		if (course && course.details.description) {
			container.append($('<p/>').html(course.details.description));
		} else {
			var error = "No course description was found, or the server is temporarily unavailable.";
			container.append($('<p/>').html(error));
		}

		// instructor information	
		container.append($('<hr/>'));

		var profName = $(context).find('[data-visible="instr"] em').html();
		container.append($('<h5/>').html(profName));

		var notFoundMessage = 'No information is available for this instructor.';

		console.log('[here2] ' + normalize(profName));
		if (professors.get(normalize(profName))) {
			var pillbox = makeProfessorPillbox(professors.get(normalize(profName)).value);
			if (pillbox) {
				container.append(pillbox);
			} else {
				container.append($('<p/>').html(notFoundMessage));
			}
		} else {
			getProfessorStats(profName, function (data, spinner) {
				professors.add(profName, data);
				if (data) {
					var pillbox = makeProfessorPillbox(data);
					if (pillbox) {
						spinner.end();
						container.append(pillbox.fadeIn());
					} else {
						spinner.error(notFoundMessage);
					}
				} else {
					spinner.error(notFoundMessage);
				}
			}, new Loader(container));
		}

		container.appendTo(body);
	});
});

event.onCourseAdded(function (context) {
	var courseTitle = $(context).find('.name').text();
	downloadCourseStats(courseTitle, function (course) {
		if (course) {
			var color = $(context).css('border-left-color');
			color = RGBtoRGBA(color, '0.15');
			var table = makeAverageMarksTable(course.averageMarks, color).hide();
			table.insertBefore($(context).find('.course-table-container .table')).fadeIn();
		}
	});	
});

