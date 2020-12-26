function path_find_request(source, dest, onload) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${host}/path/${source}/${dest}`, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.onload = onload;
    xhr.send();
}