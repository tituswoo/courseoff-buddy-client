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

			if (!context.data('hovered')) {
				var loader = new Loader(context.find('.table'), 'average-marks-table-loading');
				loader.begin();

				Courses.get(course, function (response) {
					loader.finish();
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
				context.data('hovered', true);
			}
		});
	};

	function attachProfInfoInCourseList(context) {
		context.find('.instructor').each(function () {
			var thatContext = $(this);
			var profName = $(this).text();

			console.log('getting info for ' + profName);
			Instructors.get(profName, function () {});
		});

		$('body').on('mouseenter', '.instructor', function () {
			var context = $(this);
			var profName = context.text();
			if (!context.data('hovered')) {
				$(this).tooltipster({
					position: 'left',
					onlyOne: true,
					interactive: true,
					delay: 10,
					speed: 0,
					theme: 'tooltipster-courseoff-light',
					debug: false,
					content: 'Loading...',
					functionBefore: function (origin, continueTooltip) {
						context.data('hovered', true);
						continueTooltip();
						Instructors.get(profName, function (response) {
							if (response.successful) {							
								origin.tooltipster('content', makeDetailedProfessorStatsBox(response.data));
							} else {
								origin.tooltipster('content', 'Nothing found.');
							}
						});
					}
				});
				$(this).tooltipster('show');
			}
		});
	};

	return new Buddy();
})();