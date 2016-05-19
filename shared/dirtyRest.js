import $ from 'jquery'

export function dirtyGet(url) {
  let deferred = $.Deferred()
  chrome.runtime.sendMessage({ command: 'mget', url }, resp => {
    if (resp.success) return deferred.resolve(resp.resp)
    return deferred.reject(resp.resp)
  })
  return deferred.promise()
}
