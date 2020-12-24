function export_request(onload) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${host}/export/json`, true);
    xhr.responseType = 'json';
    xhr.onload = onload;
    xhr.send();
}
