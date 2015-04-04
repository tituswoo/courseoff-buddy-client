var Courses = (function () {

	var courses = new ArrayList();
	
	function Courses() {}

	Courses.prototype.get = function (courseName, callback) {
		var course = courses.get(courseName);

		if (course) {
			callback(course.value);
		} else {
			chrome.runtime.sendMessage({
				action: 'get',
				url: 'http://localhost:3000/course/' + courseName
			}, function (response) {
				courses.add(courseName, response);
				callback(response);
			});
		}
	};

	return new Courses();
})();