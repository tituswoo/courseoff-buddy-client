import $ from 'jQuery'

let PageEvents = new PageEvent()
export default PageEvents

function PageEvent() {}

PageEvent.prototype.onPageLoaded = function (callback) {
	var checkInterval = setInterval(function () {
		if ($('.course-info-container').html() != undefined) {
			clearInterval(checkInterval);
			callback();
		}
	}, 300);
};

PageEvent.prototype.onPopupAdded = function (callback) {
	$('body').observe('childList', '.popover.tip', function(record) {
		if (record.addedNodes[0] != null) {
			var context = $(record.addedNodes[0]);
			// need to set timeout so that it waits for
			// the "current course" to be updated.
			// hacky, but works.
			setTimeout(function () {
				callback(context);
			}, 10);
		} else {
		}
	});
};

PageEvent.prototype.onCourseAdded = function (callback) {
	this.onPageLoaded(function () {
		$('.course-list').observe('childList', '.course-info-container', function(record) {
			if (record.addedNodes[0] != null) callback(record.addedNodes[0]);
		});
	});
};

PageEvent.prototype.onCourseRemoved = function (callback) {
	this.onPageLoaded(function () {
		$('.course-list').observe('childList', '.course-info-container', function(record) {
			if (record.removedNodes[0] != null) callback(record.removedNodes[0]);
		});
	});
};

PageEvent.prototype.onCoursePinned = function (callback) {
	this.onPageLoaded(function () {
		$('.calendar .wk-day-body').observe('childList', '.course-box', function(record) {
			var node = record.addedNodes[0];
			if (node != null) {
				callback(node);
			}
		});
	});
};

PageEvent.prototype.onCourseUnpinned = function (callback) {
	this.onPageLoaded(function () {
		$('.calendar .wk-day-body').observe('childList', '.course-box', function(record) {
			var node = record.removedNodes[0];
			if (node != null) {
				callback(node);
			}
		});
	});
};

PageEvent.prototype.onResourcesLoaded = function (courses, callback) {
	this.onPageLoaded(function () {
		var numCourses = $('.course-list > .course-info-container').size();
		var interval = setInterval(function () {
			if (courses.size() == numCourses) {
				clearInterval(interval);
				callback();
			}
		}, 150);
	});
};
