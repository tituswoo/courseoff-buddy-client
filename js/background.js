chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.command === 'search') {
			$.getJSON('http://courseoffbuddy.tkw.im/search/' + request.params.query.trim())
				.done(function (data) {
					sendResponse(data);
				}).fail(function (message) {
					sendResponse(message);
				});
		} else if (request.command === 'prof') {
			$.getJSON('http://courseoffbuddy.tkw.im/prof/' + request.params.id)
				.done(function (data) {
					sendResponse(data);
				}).fail(function (message) {
					sendResponse(message);
				});;
		} else if (request.command === 'course') {
			$.getJSON('http://courseoffbuddy.tkw.im/course/' + request.params.id)
				.done(function (data) {
					sendResponse(data);
				}).fail(function (message) {
					sendResponse(message);
				});;
		}
		// this is very important.
		// see: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
		return true;
	});

chrome.runtime.onMessage.addListener(function (message, sender) {
	if (message && message.type === 'showPageAction') {
		var tab = sender.tab;
		chrome.pageAction.show(tab.id);
	}
});