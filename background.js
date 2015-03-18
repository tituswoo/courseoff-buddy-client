chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.command === 'search') {
			$.getJSON('http://localhost:3000/search/' + request.params.query)
				.done(function (data) {
					sendResponse(data);
				}).fail(function (message) {
					sendResponse(message);
				});
		} else if (request.command === 'prof') {
			$.getJSON('http://localhost:3000/prof/' + request.params.id)
				.done(function (data) {
					sendResponse(data);
				}).fail(function (message) {
					sendResponse(message);
				});;
		} else if (request.command === 'course') {
			$.getJSON('http://localhost:3000/course/' + request.params.id)
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