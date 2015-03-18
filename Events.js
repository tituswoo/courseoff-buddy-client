function Events() {}

Events.prototype.onPageLoaded = function (callback) {
	var checkInterval = setInterval(function () {
		console.log('Waiting for page to finish loading...');
		if ($('.course-info-container').html() != undefined) {
			clearInterval(checkInterval);
			callback();
		}
	}, 300);
};

Events.prototype.onPopupAdded = function (callback) {
	$('body').observe('childList', '.popover.tip', function(record) {
		if (record.addedNodes[0] != null) {
			var context = $(record.addedNodes[0]);
			callback(context);
		} else {
		}
	});
};

Events.prototype.onCourseAdded = function (callback) {
	this.onPageLoaded(function () {
		$('.course-list').observe('childList', '.course-info-container', function(record) {
			if (record.addedNodes[0] != null) callback(record.addedNodes[0]);
		});
	});	
};

Events.prototype.onCourseRemoved = function (callback) {
	this.onPageLoaded(function () {
		$('.course-list').observe('childList', '.course-info-container', function(record) {
			if (record.removedNodes[0] != null) callback(record.removedNodes[0]);
		});
	});
};

Events.prototype.onCoursePinned = function (callback) {
	this.onPageLoaded(function () {
		$('.calendar .wk-day-body').observe('childList', '.course-box', function(record) {
			var node = record.addedNodes[0];
			if (node != null) {
				callback(node);
			}
		});
	});
};

Events.prototype.onCourseUnpinned = function (callback) {
	this.onPageLoaded(function () {
		$('.calendar .wk-day-body').observe('childList', '.course-box', function(record) {
			var node = record.removedNodes[0];
			if (node != null) {
				callback(node);
			}
		});
	});
};