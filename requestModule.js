export function request(url) {
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    if (localStorage.getItem("etag-" + url) !== null && localStorage.getItem("cachedData-" + url) !== null) request.setRequestHeader("If-None-Match", localStorage.getItem("etag-" + url));
    request.send(null);
    if (request.status === 200) {
        localStorage.setItem("etag-" + url, request.getResponseHeader("ETag"));
        localStorage.setItem("cachedData-" + url, request.responseText);
        return request.responseText
    } else if (request.status === 304) return localStorage.getItem("cachedData-" + url);
}
