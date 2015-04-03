// chrome.runtime.onMessage.addListener(
// 	function(request, sender, sendResponse) {
// 		if (request.command === 'search') {
// 			$.getJSON('http://courseoffbuddy.tk/search/' + request.params.query)
// 				.done(function (data) {
// 					sendResponse(data);
// 				}).fail(function (message) {
// 					sendResponse(message);
// 				});
// 		} else if (request.command === 'prof') {
// 			$.getJSON('http://courseoffbuddy.tk/prof/' + request.params.id)
// 				.done(function (data) {
// 					sendResponse(data);
// 				}).fail(function (message) {
// 					sendResponse(message);
// 				});;
// 		} else if (request.command === 'course') {
// 			$.getJSON('http://courseoffbuddy.tk/course/' + request.params.id)
// 				.done(function (data) {
// 					sendResponse(data);
// 				}).fail(function (message) {
// 					sendResponse(message);
// 				});;
// 		}
// 		// this is very important.
// 		// see: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
// 		return true;
// 	});

// chrome.runtime.onMessage.addListener(function (message, sender) {
// 	Buddy.listen(message, sender);
// 	if (message && message.type === 'showPageAction') {
// 		var tab = sender.tab;
// 		chrome.pageAction.show(tab.id);
// 	}
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === 'get') {
		$.getJSON(request.url)
			.done(function (data) {
				sendResponse({
					successful: true,
					data: data
				});
			})
			.fail(function (e) {
				sendResponse({
					successful: false,
					data: e
				});
			});

		return true;
	}
});

chrome.runtime.onMessage.addListener(function (request, sender) {
	if (request && request.action === 'showPageAction') {
		var tab = sender.tab;
		chrome.pageAction.show(tab.id);
	}
})

// chrome.runtime.onMessage.addListener(function (request, sender, response) {
// 	if (request.action === 'getTabId') {
// 		response({
// 			tabId: sender.tab.id
// 		});
// 	}
// });