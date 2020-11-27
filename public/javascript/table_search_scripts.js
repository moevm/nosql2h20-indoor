let list = ['Here is some text',
    'Here is a little more text',
    'And here is much much more text than in previous card just for testing',
    'I am going to put couple strings of random text here just for fun. just because I can do that. Nothing will stop me from that. Couple more random words and I am done here'];

//let example_info =  [{name:1, v:2}, {name:2, info:3}, {name:3, info:4}];

let search_list = document.querySelector('.search-item-list');
let search_button = document.querySelector('.search-submit');
let input_text = document.querySelector('.search-input');
let clear_button = document.querySelector('.search-clear');
let inf_block = document.querySelector('.inf-block__info');

search_button.addEventListener('click', search);
clear_button.addEventListener('click', clear_search_input);
/*input_text.addEventListener('', input_change);*/


function enter() {
    search()
}
function clear_list() {
    while (search_list.children.length > 0) {
        search_list.firstChild.remove();
    }
}
function input_change() {
//     search();
//     if (input_text.value.trim().length > 0){
//         clear_list()
//     }
}
function search() {
    clear_list();
    if (input_text.value.trim().length > 0) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:3000/search', true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.onload = function () {
            // if (xhr.readyState != 4) {
            //     return;
            // }
            //let new_info  = document.createElement('p');
            console.log("HERE")
            let example_info = JSON.parse(xhr.response);
            //inf_block.appendChild(new_info);
            //inf_block.classList.remove('hidden')

            for(let i = 0; i < example_info.length; i++){
                let new_item = document.createElement('li');
                new_item.className = 'search-elem';
                new_item.classList.add('search-elem__new-item');
                let new_item_text = document.createElement('b');
                new_item_text.className = 'item-text';
                let new_item_textContent = '';
                for(let item in example_info[i]){
                    new_item_textContent += item + ': ' + example_info[i][item] + ', ';
                }
                new_item_text.textContent = new_item_textContent;
                new_item.append(new_item_text);
                new_item.addEventListener('mouseover', select);
                new_item.addEventListener('mouseout', stop_selection);
                search_list.appendChild(new_item);
            }
        };
        xhr.send(new URLSearchParams({search:input_text.value}));

        // let new_info  = document.createElement('p');
        // for(let i = 0; i < example_info.length; i++){
        //     let new_item = document.createElement('li');
        //     new_item.className = 'search-elem';
        //     new_item.classList.add('search-elem__new-item');
        //     let new_item_text = document.createElement('b');
        //     new_item_text.className = 'item-text';
        //     let new_item_textContent = '';
        //     for(let item in example_info[i]){
        //         new_item_textContent += item + ': ' + example_info[i][item] + ', ';
        //     }
        //     new_item_text.textContent = new_item_textContent;
        //     new_item.append(new_item_text);
        //     new_item.addEventListener('mouseover', select);
        //     new_item.addEventListener('mouseout', stop_selection);
        //     search_list.appendChild(new_item);
        // }

        /*for (let i = 0; i < list.length; i++) {
            let new_item = document.createElement('li');
            new_item.className = 'search-elem';
            new_item.classList.add('search-elem__new-item');
            let new_item_text = document.createElement('b');
            new_item_text.className = 'item-text';
            new_item_text.textContent = list[i];
            new_item.append(new_item_text);
            new_item.addEventListener('mouseover', select);
            new_item.addEventListener('mouseout', stop_selection);
            search_list.appendChild(new_item);
        }*/
    } else {
        alert('Wrong value!')
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
    let new_info = document.createElement('p');
    new_info.textContent = li.children.item(0).textContent;
    inf_block.appendChild(new_info);
    inf_block.classList.remove('hidden')
}

function clear_search_input() {
    clear_list();
    input_text.value = '';
}