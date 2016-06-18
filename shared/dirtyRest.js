import $ from 'jquery';

export function get(url) {
  const deferred = $.Deferred();

  const cached = sessionStorage.getItem(url);

  if (cached) {
    return deferred.resolve(JSON.parse(cached));
  }

  chrome.runtime.sendMessage({ command: 'mget', url }, resp => {
    if (resp.success) {
      sessionStorage.setItem(url, JSON.stringify(resp.resp));
      deferred.resolve(resp.resp);
    }
    return deferred.reject(resp.resp);
  });

  return deferred.promise();
}
