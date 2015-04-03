var Buddy = (function () {

	function Buddy() {
		this.showPageAction();
	}

	Buddy.prototype.showPageAction = function () {
		chrome.extension.sendMessage({ action: 'showPageAction'});
	};

	Buddy.prototype.init = function () {
		this.attachCourseListInfo();
	};

	Buddy.prototype.attachCourseListInfo = function () {
		$('body').on('mouseenter', '.course-info-container', function (event) {
			var course = $(this).find('.name').text();
			course = normalize(course);
			course = course.substring(0, course.indexOf('-'));
			var context = $(this);
			var table = new AverageMarksTable();

			if (!context.data('clicked')) {
				Courses.get(course, function (response) {
					if (response.successful) {
						// create average marks table and insert:
						var color = context.css('border-left-color');
						color = RGBtoRGBA(color, '0.15');
						table.config(response.data.averageMarks, color);
						table.make().hide().insertBefore(context.find('.table')).fadeIn();						
					} else {
						table.error().hide().insertBefore(context.find('.table')).fadeIn();
					}
				});
				attachProfInfoInCourseList(context);
				context.data('clicked', true);
			}
		});
	};

	function attachProfInfoInCourseList(context) {
		context.find('.instructor').each(function () {
			var profName = $(this).text();
			Instructors.get(profName, function (response) {
				if (response.successful) {

				} else {

				}
			});
		});

		
	};

	return new Buddy();
})();