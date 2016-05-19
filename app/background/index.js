import axios from 'axios'

console.info('BACKGROUND SCRIPT RUNNING')

chrome.runtime.onMessage.addListener(
	(request, sender, sendResponse) => {
    const { command, url } = request
		if (command === 'mget') {
      axios.get(url)
        .then(resp => {
          console.info('SUCCESS', url, resp)
          sendResponse({ success: true, resp })
        })
        .catch(resp => {
          console.warn('FAILED', url, resp)
          sendResponse({ success: false, resp })
        })
		}
    // this is very important.
    // see: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
    return true
	}
)
