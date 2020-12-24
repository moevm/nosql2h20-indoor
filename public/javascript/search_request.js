function search_request(query, onload) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${host}/search`, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.onload = onload;
    xhr.send(new URLSearchParams({search: query}));
}