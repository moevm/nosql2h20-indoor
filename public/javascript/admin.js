let cards_info = [];

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
    dropArea.addEventListener(eventName, preventDefaults, false);
});
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});
dropArea.addEventListener('drop', handleDrop, false);

export_btn.addEventListener('click', function () {
    export_request( function () {
        console.log(this.response.room);
        let element = document.createElement('a');
        element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.response)));
        element.setAttribute('download', "test.json");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    });
});

function hide_message() {
    status_message.textContent = '';
    dark_area.classList.add('hidden');
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    ([...files]).forEach(uploadFile);
}

function uploadFile(file) {
    import_file_request(file, function () {
        if (this.readyState === 4) {
            console.log(this.status);
            console.log(this.statusText);
            dark_area.classList.remove('hidden');
            if (this.status >= 200 && this.status <= 300) {
                status_message_area.classList.add('status_ok');
            } else {
                status_message_area.classList.add('status_not_ok');
            }
            status_message.textContent = this.status + ' ' + this.statusText;
            setTimeout(hide_message, 5000);
        }
    });
}

function clear_list() {
    while (search_list.children.length > 0) {
        search_list.firstChild.remove();
    }
}

function search() {
    clear_list();
    search_request(input_text.value, function () {
        cards_info = JSON.parse(this.response);
        if (cards_info.length > 0) {
            for (let i = 0; i < cards_info.length; i++) {
                let new_item = document.createElement('li');
                new_item.className = 'search-elem';
                new_item.classList.add('search-elem__new-item');
                let new_item_text = document.createElement('b');
                new_item_text.className = 'item-text';
                let new_item_textContent = '';
                new_item_textContent += 'id: ' + cards_info[i]['_id'] + ', name: ' + cards_info[i]['name'];
                new_item_text.textContent = new_item_textContent;
                new_item.append(new_item_text);
                new_item.addEventListener('mouseover', select);
                search_list.appendChild(new_item);
            }
        } else {
            let new_item = document.createElement('li');
            new_item.className = 'search-elem';
            new_item.classList.add('search-elem__new-item');
            new_item.classList.add('empty_search');
            let new_item_text = document.createElement('b');
            new_item_text.className = 'item-text';
            new_item_text.textContent = 'No results';
            new_item.append(new_item_text);
            search_list.appendChild(new_item);
        }
    });
}

function select(event) {
    let li = event.target;
    if (event.target.classList.contains('item-text')) {
        li = event.target.parentElement;
    }
    for (let i = 0; i < search_list.children.length; i++) {
        search_list.children[i].classList.remove('selected');
    }
    li.classList.add('selected');
    let new_info = document.createElement('div');
    for (let i = 0; i < search_list.children.length; i++) {
        if (search_list.children[i] === li) {
            let new_info_name = document.createElement('p');
            new_info_name.className = 'info_name';
            new_info_name.textContent = 'name' + ': ' + cards_info[i]['name'];
            new_info.appendChild(new_info_name);
            let new_info_tags = document.createElement('p');
            new_info_tags.className = 'info_tags';
            new_info_tags.textContent = 'tags' + ': ' + cards_info[i]['tags'];
            new_info.appendChild(new_info_tags);
            for (let item in cards_info[i]) {
                if (item === 'name' || item === 'tags' || item === 'walls') {
                    continue;
                }
                let new_info_textItem = document.createElement('p');
                new_info_textItem.textContent = item + ': ' + cards_info[i][item];
                new_info.appendChild(new_info_textItem);
            }
        }
    }
    if (inf_block.children.length) {
        inf_block.removeChild(inf_block.children[0]);
    }
    inf_block.appendChild(new_info);
    inf_block.classList.remove('hidden');
}

function clear_search_input() {
    clear_list();
    inf_block.classList.add('hidden');
    input_text.value = '';
}
