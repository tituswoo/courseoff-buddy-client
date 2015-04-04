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
				context.data('hovered', true);
			}
		});
	};

	function attachProfInfoInCourseList(context) {
		context.find('.instructor').each(function () {
			var thatContext = $(this);
			var profName = $(this).text();

			if (!thatContext.data('hovered')) {
				console.log('getting info for ' + profName);
				Instructors.get(profName, function (response) {
					// console.log(response);
					thatContext.data('hovered', true);
				});
			}
		});

		$('body').on('mouseenter', '.instructor', function () {
			var profName = $(this).text();

			$(this).tooltipster({
				position: 'left',
				onlyOne: true,
				interactive: true,
				delay: 10,
				speed: 0,
				theme: 'tooltipster-courseoff-light',
				content: 'Loading...',
				functionBefore: function (origin, continueTooltip) {
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
		});

		/*$('body').on('mouseenter', '.instructor', function () {
			var context = $(this);

			if (!context.data('hovered')) {
				Instructors.get(name, function (response) {

				});
				context.data('hovered', true);
			}

			/*$(this).tooltipster({
				onlyOne: true,
				position: 'left',
				theme: 'tooltipster-courseoff-light',
				animation: 'fade',
				speed: 0,
				delay: 0,
				interactive: true,
				functionBefore: function (origin, continueTooltip) {
					var name = normalize($(this).html());
					origin.tooltipster('content', '');

					if (!context.data('hovered')) {
						Instructors.get(name, function (response) {
							console.log(response);
							// if (response.success) {
							// 	origin.tooltipster('content', 'SUCCESS');
							// } else {
							// 	origin.tooltipster('content', $('<p>No information found for this instructor.</p>'));
							// }
							context.data('hovered', true);
						});
					}
					continueTooltip();	
				}
			});
			$(this).tooltipster('show');*/
		//});*/
	};

	return new Buddy();
})();