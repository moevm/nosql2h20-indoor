function walls_request(floor, onload) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${host}/walls/${floor}`, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.onload = onload;
    xhr.send();
}