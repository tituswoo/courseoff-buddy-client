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
});