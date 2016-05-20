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
	this.onPageLoaded(() => {
		let observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.addedNodes.length > 0) {
					callback(mutation.addedNodes[0])
				}
			})
		})
		const target = $('body')[0]
		const config = { childList: true }

		observer.observe(target, config)
	})
}

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

/**
 * Fires whenever a course block is added to the page.
 * Also fires initially for every block already on the page at startup.
 */
PageEvent.prototype.onCourseBlockAdded = function(callback) {
	this.onPageLoaded(() => {
		$('.course-cal.pinned').each((index, block) => {
			callback(block)
		})
		let observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				const { type, target, attributeName } = mutation
				if (type === 'attributes' && attributeName === 'class') {
					if ($(target).is('.pinned')) {
						callback(target)
					}
				}
			})
		})
		const target = $('.calendar-panel > .calendar > table > tbody')[0]
		const config = { childList: true, subtree: true, attributes: true }

		observer.observe(target, config)
	})
}
