var Courses = (function () {

	var courses = new ArrayList();
	
	function Courses() {}

	Courses.prototype.get = function (courseName, callback) {
		var course = courses.get(courseName);

		if (course) {
			return course;
		} else {
			chrome.runtime.sendMessage({
				action: 'get',
				url: 'http://courseoffbuddy.tk/course/' + courseName
			}, function (response) {
				courses.add(courseName, response);
				callback(response);
			});
		}		
	};

	return new Courses();
})();