import PubSub from 'pubsub-js';

function on(topic, cb) {
  return PubSub.subscribe(topic, (msg, data) => cb(data));
}

onPageLoaded(() => {
  PubSub.publish('pageLoaded');
});

onPopupAdded((popup) => {
	PubSub.publish('popupAdded', popup);
});

onCourseAdded((course) => {
  PubSub.publish('courseAdded', course);
});

onWorkspaceChanged(() => PubSub.publish('workspaceChanged'));

// onCourseBlockAdded((courseBlock) => {
//     PubSub.publish('courseBlockAdded', courseBlock);
// });

// let observer = new MutationObserver(mutations => {
// 	mutations.forEach( ( mutation ) => {
// 		// console.log(target)
// 		const $target = $(mutation.target)
//
// 		if (mutation.attributeName === 'class') {
// 			if ($target.not('.tip-hide').is('.popover')) {
// 				console.info('popoverAdded')
// 			}
// 		}
//
// 		// onPopupAdded($target, () => PubSub.publish('popoverAdded'))
//
// 		// onPageLoaded($target, () => PubSub.publish('pageLoaded'))
// 	})
// })
//
// const target = document.querySelector('body')
// const config = { childList: true, subtree: true, attributes: true }
//
// observer.observe(target, config)
//
// function onPageLoaded($elem, cb) {
// 	if ($elem.is('body')) {
// 		console.info('page loaded')
// 		cb()
// 	}
// }
//
// function onPopupAdded($elem, cb) {
// 	if ($elem.is('.popover')) {
// 		console.info('onPopoverAdded')
// 		cb()
// 	}
// }
//
function onPageLoaded(callback) {
  const checkInterval = setInterval(() => {
    const coursesLoaded = !!document.querySelector('.course-info-container');
    const footerLoaded = !!document.querySelector('.calendar-panel .noprint').outerText;

    if (coursesLoaded && footerLoaded) {
      clearInterval(checkInterval);
      callback();
    }
  }, 500);
}

function onPopupAdded(callback) {
  on('pageLoaded', () => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          const node = mutation.addedNodes[0];
          if (node && node.classList && node.classList.contains('popover')) {
            // console.info(mutation.addedNodes[0], mutation.removedNodes[0]);
            callback(node);
          }
        }
        // if (mutation.addedNodes.length > 0) {
        // 	if ($(mutation.addedNodes[0]).is('.popover.tip')) {
        // 		callback(mutation.addedNodes[0])
        // 	}
        // }
      });
    });
    const target = document.body;
    const config = { childList: true, subtree: true };

    observer.observe(target, config);
  });
}

function onCourseAdded(callback) {
  on('pageLoaded', () => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          callback(mutation.addedNodes[0]);
        }
      });
    });

    on('workspaceChanged', () => {
      const target = document.querySelector('.course-list');
      const config = { childList: true };
      observer.observe(target, config);
    });
  });
}


function onWorkspaceChanged(cb) {
  on('pageLoaded', () => {
    cb();

    const observer = new MutationObserver(() => {
      cb();
    });

    const target = document.querySelector('#workspace');
    const config = { childList: true };

    observer.observe(target, config);
  });
}


//
// /**
//  * Fires whenever a course block is added to the page.
//  * Also fires initially for every block already on the page at startup.
//  */
// function onCourseBlockAdded(callback) {
// 	on('pageLoaded', () => {
// 		$('.course-cal.pinned').each((index, block) => {
// 			callback(block)
// 		})
// 		let observer = new MutationObserver(mutations => {
// 			mutations.forEach(mutation => {
// 				const { type, target, attributeName } = mutation
// 				if (type === 'attributes' && attributeName === 'class') {
// 					if ($(target).is('.pinned')) {
// 						callback(target)
// 					}
// 				}
// 			})
// 		})
// 		const target = $('.calendar-panel > .calendar > table > tbody')[0]
// 		const config = { childList: true, subtree: true, attributes: true }
//
// 		observer.observe(target, config)
// 	})
// }

export default {
  on,
  off: PubSub.unsubscribe,
};
