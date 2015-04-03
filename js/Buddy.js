var Buddy = (function () {

	var courses = new ArrayList();

	function Buddy() {
		this.showPageAction();
	}

	Buddy.prototype.showPageAction = function () {
		chrome.extension.sendMessage({ action: 'showPageAction'});
	};

	Buddy.prototype.init = function () {
		$('body').on('mouseenter', '.course-info-container', function () {
			var course = $(this).find('.name').text();
			course = normalize(course);
			course = course.substring(0, course.indexOf('-'));
			var context = $(this);

			var table = new AverageMarksTable();

			Courses.get(course, function (response) {
				if (response.successful) {
					var color = context.css('border-left-color');
					color = RGBtoRGBA(color, '0.15');
					table.config(response.data.averageMarks, color);
					table.make().hide().insertBefore(context.find('.table')).fadeIn();
				} else {
					table.error().hide().insertBefore(context.find('.table')).fadeIn();
				}
			});
		});
	};

	return new Buddy();
})();