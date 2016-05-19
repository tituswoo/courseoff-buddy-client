import $ from 'jQuery'

let PageEvents = new PageEvent()
export default PageEvents

function PageEvent() {}

PageEvent.prototype.onPageLoaded = function (callback) {
	let checkInterval = setInterval(function () {

		let coursesLoaded = !!$('.course-info-container').html()
		let footerLoaded = !!$('.calendar-panel > .noprint').text()

		if (coursesLoaded && footerLoaded) {
			clearInterval(checkInterval)
			callback()
		}
	}, 500);
};

PageEvent.prototype.onPopupAdded = function (callback) {

	$('body').onCreate('.popover.tip', function(record) {
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
		let observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.addedNodes.length > 0) {
					callback(mutation.addedNodes)
				}
			})
		})
		const target = $('.course-list')[0]
		const config = { childList: true }

		observer.observe(target, config)
	});
};
