var event = new Events();
var courses = new ArrayList();
var professors = new ArrayList();
var currentCourse = '';
var loadingScreen = new LoadingScreen();

if (numCourses() > 0) {
	loadingScreen.show();
}

$('body').on('mouseenter', '.course-box', function () {
	var course = $(this).find('.course-content').html();
	currentCourse = course.replace(' - ', '');
});

event.onPageLoaded(function () {
	var coursesCount = numCourses();
	var counter = 1;

	if (coursesCount > 0) {
		$('.course-list > .course-info-container').each(function () {
			var courseTitle = $(this).find('.name').text();
			downloadCourseStats(courseTitle, function () {
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

		var profName = $(context).find('[data-visible="instr"] em').html();
		if (professors.get(profName)) {
			console.log('professor was stored already.');
		} else {
			console.log('professor not stored locally. Retrieve!');
			getProfessorStats(profName, function (data) {
				var professorData = data;
				professors.add(profName, data);
				console.log(professors.get(profName));
				// display the professor stats in the box here.
			});
		}

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

