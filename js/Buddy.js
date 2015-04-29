var Buddy = (function () {

	function Buddy() {
		this.showPageAction();
	}

	Buddy.prototype.showPageAction = function () {
		chrome.extension.sendMessage({ action: 'showPageAction'});
	};

	Buddy.prototype.init = function () {
		this.attachCourseListInfo();
		this.attachCourseInfoPopup();
		this.attachBanner();
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
				attachProfInfoPopup(context);
				context.data('hovered', true);
			}
		});
	};

	function attachProfInfoPopup(context) {
		context.find('.instructor').each(function () {
			var thatContext = $(this);
			var profName = $(this).text();
			Instructors.get(profName, function () {});
		});

		$('body').on('mouseenter', '.instructor', function () {
			var context = $(this);
			var profName = context.text();
			if (!context.data('hovered')) {
				var loader = new Loader(context);
				$(this).tooltipster({
					position: 'left',
					onlyOne: true,
					interactive: true,
					delay: 10,
					speed: 0,
					theme: 'tooltipster-courseoff-light',
					debug: false,
					content: loader.html(),
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

	Buddy.prototype.attachCourseInfoPopup = function () {
		var pageEvent = new PageEvent();
		$('body').on('mouseenter', '.course-cal.pinned', function () {
			var that = $(this);

			that.tooltipster({
				interactive: true,
				onlyOne: true,
				delay: 0,
				speed: 0,
				theme: 'tooltipster-courseoff-light',
				debug: false,
				position: 'right',
				functionBefore: function (origin, continueTooltip) {
					continueTooltip();					
					setTimeout(function () {
						var data = $('.tip-inner .popover > .body').find('em');
						var course = {
							crn: data[0].innerText,
							section: data[1].innerText,
							credits: data[2].innerText,
							professor: data[3].innerText,
							location: data[4].innerText
						};
						console.log(course);

						var html = $('<h5>CRN</h5>' + '<p>' + course.crn + '</p>');
						origin.tooltipster('content', html);						
					}, 100);
				}
			});
			that.tooltipster('show');
		});
	};

	Buddy.prototype.attachBanner = function () {
		var chromePageUrl = 'http://chrome.google.com/webstore/detail/courseoff-buddy-for-georg/hiiomkfdlmhbdfbjboldgnkdhcboifhe';
		var messages = [
			$('<a/>').attr('href', chromePageUrl).attr('target', '_blank')
					 .html('Rate Courseoff Buddy on the Chrome Store!'),
			$('<a/>').attr('href', chromePageUrl).attr('target', '_blank')
					 .html('Courseoff Buddy is enabled.'),
			$('<p/>').html('Found a bug? Report it on the <a href="http://bit.ly/courseoff-buddy-issue-tracker" target="_blank">issue tracker</a>.')
		];

		var message = messages[Math.floor(Math.random() * messages.length)];
		var credits = $('<div/>').css({ float: 'right', color: 'gray'})
							   .html(message)
							   .hide();
		var context = $('.calendar-panel > .noprint');

		setTimeout(function () {
			$('.calendar-panel > .noprint').append(credits.fadeIn());
		}, 1500);
	};

	return new Buddy();
})();