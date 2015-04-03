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

			Courses.get(course, function (response) {
				if (response.successful) {
					console.log(response.data);
					var color = context.css('border-left-color');
					color = RGBtoRGBA(color, '0.15');
					var table = makeAverageMarksTable(response.data.averageMarks, color).hide();
					table.insertBefore(context.find('.table')).fadeIn();
				} else {
					console.log(response.data);
				}
			});
		});
	};

	return new Buddy();
})();