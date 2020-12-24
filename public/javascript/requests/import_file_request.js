function import_file_request(file, onreadystatechange) {
    let url = `${host}/import/file`;
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = onreadystatechange;
    formData.append('data', file);
    xhr.send(formData);
}