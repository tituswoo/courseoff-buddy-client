import $ from 'jQuery'
import PubSub from 'pubsub-js'

export default { on }

function on(topic, cb) {
	PubSub.subscribe(topic, (msg, data) => cb(data))
}

onPageLoaded(() => {
	PubSub.publish('pageLoaded')
})

onPopupAdded((popup) => {
	PubSub.publish('popupAdded', popup)
})

onCourseAdded((course) => {
	PubSub.publish('courseAdded', course)
})

onCourseBlockAdded((courseBlock) => {
	PubSub.publish('courseBlockAdded', courseBlock)
})

function onPageLoaded(callback) {
	let checkInterval = setInterval(function () {

		let coursesLoaded = !!$('.course-info-container').html()
		let footerLoaded = !!$('.calendar-panel > .noprint').text()

		if (coursesLoaded && footerLoaded) {
			clearInterval(checkInterval)
			callback()
		}
	}, 500);
};

function onPopupAdded(callback) {
	on('pageLoaded', () => {
		let observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.addedNodes.length > 0) {
					if ($(mutation.addedNodes[0]).is('.popover.tip')) {
						callback(mutation.addedNodes[0])
					}
				}
			})
		})
		const target = $('body')[0]
		const config = { childList: true }

		observer.observe(target, config)
	})
}

function onCourseAdded(callback) {
	on('pageLoaded', () => {
		let observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.addedNodes.length > 0) {
					callback(mutation.addedNodes[0])
				}
			})
		})
		const target = $('.course-list')[0]
		const config = { childList: true }

		observer.observe(target, config)
	})
};

/**
 * Fires whenever a course block is added to the page.
 * Also fires initially for every block already on the page at startup.
 */
function onCourseBlockAdded(callback) {
	on('pageLoaded', () => {
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
