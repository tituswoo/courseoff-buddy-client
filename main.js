$(document).ready(function () {
	addListeners();
});

function addListeners() {
	$('.course-list .course-info-container .header').each(function () {
		addCourseInformation($(this).parent());
		$(this).click(function (e) {
			courseClicked($(e.delegateTarget).parent());
			$(this).unbind('click'); // only fire once!
		});
	});
}

function addCourseInformation(course) {
	var courseName = course.find('.name').text();

	retrieve('search', {query: courseName}, function (data) {
		var courseID = data[0].id;
		retrieve('course', {id: courseID}, function (data) {
			var averages = data.averageMarks;
			course.find('.header').append('<div class="course-addon">Averages: '+averages.gpa+' GPA</div>');
		});
	});
}

function retrieve(command, params, callback) {
	chrome.runtime.sendMessage({
		command: command,
		params: params
	}, callback);
}

function courseClicked(course) {
	// console.log($(course).find('.header').append("<p>HELLO</p>"));
	/*$(course).find('tbody td.instructor').each(function () {
		var profName = $(this).text();
		
		chrome.runtime.sendMessage({
			command: 'search',
			params: {
				query: profName
			}
		}, function (data) {
			var profID = data[0].id;
			chrome.runtime.sendMessage({
				command: 'prof',
				params: {
					id: profID
				}
			}, function (data) {
				
			});
		});
	});*/
}