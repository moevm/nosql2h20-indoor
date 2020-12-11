let list = ['Here is some text',
    'Here is a little more text',
    'And here is much much more text than in previous card just for testing',
    'I am going to put couple strings of random text here just for fun. just because I can do that. Nothing will stop me from that. Couple more random words and I am done here'];

let example_info = [
    {
        room_type: 0,
        tags: '5424,lecture,лекция',
        _id: 5424,
        name: 'Lecture audience',
        floor: 4,
        address: 'ул. Попова, д. 5',
        walls: [ [Object], [Object] ],
        confidenceScore: 5.5
    },
    {
        room_type: 0,
        tags: '5423,lecture,лекция',
        _id: 5423,
        name: 'Lecture audience',
        floor: 4,
        address: 'ул. Попова, д. 5',
        walls: [ [Object], [Object] ],
        confidenceScore: 5.5
    }
];

let search_list = document.querySelector('.search-item-list');
let search_button = document.querySelector('.search-submit');
let input_text = document.querySelector('.search-input');
let clear_button = document.querySelector('.search-clear');
let inf_block = document.querySelector('.inf-block__info');
let dropArea = document.querySelector('.import_block');
let export_btn = document.querySelector('.export-button');
let dark_area = document.querySelector('.dark');
let status_message_area = document.querySelector('.message');
let status_message = document.querySelector('.message_text');
let message_button = document.querySelector('.message_button');

message_button.addEventListener('click', hide_message);
search_button.addEventListener('click', search);
clear_button.addEventListener('click', clear_search_input);
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
});
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
});
dropArea.addEventListener('drop', handleDrop, false);

export_btn.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:3000/export/json', true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        console.log(xhr.response.room);
        let element = document.createElement('a');
        element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(JSON.stringify(xhr.response)));
        element.setAttribute('download', "test.json");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };
    xhr.send();
});

function hide_message() {
    status_message.textContent ='';
    dark_area.classList.add('hidden')
}

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}
function highlight(e) {
    dropArea.classList.add('highlight')
}
function unhighlight(e) {
    dropArea.classList.remove('highlight')
}
function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files)
}
function handleFiles(files) {
    ([...files]).forEach(uploadFile)
}
function uploadFile(file) {
    let url = 'http://127.0.0.1:3000/import/file';
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.statusText);
            dark_area.classList.remove('hidden');
            if (xhr.status >= 200 && xhr.status <= 300) {
                status_message_area.classList.add('status_ok');
            } else {
                status_message_area.classList.add('status_not_ok');
            }
            status_message.textContent = xhr.status + ' ' + xhr.statusText;
            setTimeout(hide_message, 2000);
        }
    };
    formData.append('data', file);
    xhr.send(formData)
}

function clear_list() {
    while (search_list.children.length > 0) {
        search_list.firstChild.remove();
    }
}

function search() {
    clear_list();
    if (input_text.value.trim().length >= 0) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:3000/search', true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.onload = function () {
            example_info = JSON.parse(xhr.response);
            for(let i = 0; i < example_info.length; i++){
                let new_item = document.createElement('li');
                new_item.className = 'search-elem';
                new_item.classList.add('search-elem__new-item');
                let new_item_text = document.createElement('b');
                new_item_text.className = 'item-text';
                let new_item_textContent = '';
                new_item_textContent += 'id: ' + example_info[i]['_id'] + ', name: ' + example_info[i]['name'];
                new_item_text.textContent = new_item_textContent;
                new_item.append(new_item_text);
                new_item.addEventListener('mouseover', select);
                new_item.addEventListener('mouseout', stop_selection);
                search_list.appendChild(new_item);
            }
        };
        xhr.send(new URLSearchParams({search:input_text.value}));
    }
}
function stop_selection(event) {
    let li = event.target;
    if(event.target.classList.contains('item-text')){
        li = event.target.parentElement;
    }
    li.classList.remove('selected');
    inf_block.firstChild.remove();
    inf_block.classList.add('hidden')
}
function select(event) {
    let li = event.target;
    if(event.target.classList.contains('item-text')){
        li = event.target.parentElement;
    }
    li.classList.add('selected');
    let new_info = document.createElement('div');
    for (let i = 0; i < search_list.children.length; i++){
        if(search_list.children[i] === li){
            let new_info_name = document.createElement('p');
            new_info_name.className = 'info_name';
            new_info_name.textContent = 'name' + ': ' + example_info[i]['name'];
            new_info.appendChild(new_info_name);
            let new_info_tags = document.createElement('p');
            new_info_tags.className = 'info_tags';
            new_info_tags.textContent = 'tags' + ': ' + example_info[i]['tags'];
            new_info.appendChild(new_info_tags);
            for(let item in example_info[i]){
                if(item === 'name' || item === 'tags' || item === 'walls'){
                    continue;
                }
                let new_info_textItem = document.createElement('p');
                new_info_textItem.textContent = item + ': ' + example_info[i][item];
                new_info.appendChild(new_info_textItem);
            }
        }
    }
    inf_block.appendChild(new_info);
    inf_block.classList.remove('hidden');
}

function clear_search_input() {
    clear_list();
    input_text.value = '';
}
