let cards_info = [];
let minX = 0;
let minY = 0;
let maxX = 1000;
let maxY = 1000;
let floor = 1;
let walls;
let route = null;

let body = document.querySelector('body');
let search_list = document.querySelector('.search-item-list');
let search_button = document.querySelector('.search-submit');
let input_text = document.querySelector('.search-input');
let clear_button = document.querySelector('.search-clear');
let map = document.getElementById('map-view');
let zoom_in_button = document.getElementById('+');
let zoom_out_button = document.getElementById('-');
let stairs_up_button = document.getElementById('⇧');
let stairs_down_button = document.getElementById('⇩');
let floor_label = document.querySelector('.floor-level');
let direction_clear = document.querySelector('.direction_button');
let search_list_block = document.querySelector('.search-list-block');
let background_color_blue = document.querySelector('.background_color_blue');
let background_color_grey = document.querySelector('.background_color_grey');
let block_info = document.querySelector('.block_info');
let close_info_button = document.querySelector('.close-info_button');
let block_name = document.querySelector('.block_name');
let block_info__text = document.querySelector('.block_info__text');
let search_from_input = document.querySelector('.search-from_input');
let search_to_input = document.querySelector('.search-to_input');
let find_way_from_button = document.querySelector('.find_way_from_button');
let find_way_to_button = document.querySelector('.find_way_to_button');
let rotate_direction_button = document.querySelector('.rotate_direction_button');

// let inf_block = document.querySelector('.inf-block__info');
// let dark_area = document.querySelector('.dark');
// let status_message_area = document.querySelector('.message');
// let status_message = document.querySelector('.message_text');
// let message_button = document.querySelector('.message_button');

// message_button.addEventListener('click', hide_message);
window.onload = function () {
    update_map(floor);
};
direction_clear.addEventListener('mouseover', function() {
    direction_clear.innerText = '✖';
});
direction_clear.addEventListener('click', clear_way_points);
direction_clear.addEventListener('mouseout', function() {
    direction_clear.innerText = '↓';
});
search_button.addEventListener('click', search);
clear_button.addEventListener('click', clear_search_input);
map.addEventListener('wheel', zoom);
map.addEventListener('mousedown', mouse_down);
map.addEventListener('mouseup', mouse_up);
map.addEventListener('mousemove', mouse_drag);
body.addEventListener('mouseup', mouse_up);
body.addEventListener('mouseleave', mouse_up);
let timer;
zoom_in_button.addEventListener('mousedown', function () {
    timer = setInterval(function () {
        zoom_button(-1)
    }, 50);
});
zoom_in_button.addEventListener('mouseup', clear_timer);
zoom_in_button.addEventListener('mouseout', clear_timer);
zoom_out_button.addEventListener('mousedown', function () {
    timer = setInterval(function () {
        zoom_button(1)
    }, 50);
});
zoom_out_button.addEventListener('mouseup', clear_timer);
zoom_out_button.addEventListener('mouseout', clear_timer);
function clear_timer() {
    clearInterval(timer);
}
stairs_up_button.addEventListener('click', function () {
   floor++;
   floor_label.innerText = floor.toString();
   update_map(floor);
});
stairs_down_button.addEventListener('click', function () {
    floor--;
    floor_label.innerText = floor.toString();
    update_map(floor);
});
close_info_button.addEventListener('click', collapse);
find_way_from_button.addEventListener('click', make_start_point);
find_way_to_button.addEventListener('click', make_end_point);
rotate_direction_button.addEventListener('click', swap_way_points);


function swap_way_points() {
    let tmp = search_to_input.textContent;
    search_to_input.textContent = search_from_input.textContent;
    search_from_input.textContent = tmp;
    if(search_to_input.textContent !== '' && search_from_input.textContent !== '') {
        let b = search_to_input.textContent.split(' ').slice(-1);
        let a = search_from_input.textContent.split(' ').slice(-1);
        update_route(a, b);
    }
}
function clear_way_points() {
    search_to_input.textContent = '';
    search_from_input.textContent = '';
    route = null;
    update_swg(map, walls, floor, route);
}
function make_start_point() {
    search_from_input.textContent = block_name.children[0].textContent;
    if(search_to_input.textContent === search_from_input.textContent)
        search_to_input.textContent = '';
    if(search_to_input.textContent !== '' && search_from_input.textContent !== '') {
        let b = search_to_input.textContent.split(' ').slice(-1);
        let a = search_from_input.textContent.split(' ').slice(-1);
        update_route(a, b);
    }

}

function make_end_point() {
    search_to_input.textContent = block_name.children[0].textContent;
    if(search_to_input.textContent === search_from_input.textContent)
        search_from_input.textContent = '';
    if(search_to_input.textContent !== '' && search_from_input.textContent !== '') {
        let b = search_to_input.textContent.split(' ').slice(-1);
        let a = search_from_input.textContent.split(' ').slice(-1);
        update_route(a, b);
    }
}

function update_map(floor) {
    walls_request(floor, function () {
        if (this.readyState === 4) {
            walls = this.response;
            update_swg(map, walls, floor, route);
        }
    });
}
function update_route(source, target) {
    path_find_request(source, target, function () {
        if (this.readyState === 4) {
            route = this.response;
            update_swg(map, walls, floor, route);
        }
    });
}

function clear_list() {
    if(search_list_block.classList.contains('hidden'))
        collapse();
    while (search_list.children.length > 0) {
        search_list.firstChild.remove();
    }
}

function search() {
    if(search_list_block.classList.contains('hidden'))
        collapse();
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
                new_item_textContent += cards_info[i]['name'] + ' ' + cards_info[i]['_id'];
                new_item_text.textContent = new_item_textContent;
                new_item.append(new_item_text);
                new_item.addEventListener('mouseover', select);
                new_item.addEventListener('click', choose);
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
function choose(event) {
    let li = event.target;
    if (li.classList.contains('item-text')) {
        li = li.parentElement;
    }
    search_list_block.classList.add('hidden');
    background_color_blue.classList.remove('hidden');
    background_color_grey.classList.remove('hidden');
    block_info.classList.remove('hidden');
    let new_name = document.createElement('p');
    new_name.classList.add('block_name_text');
    let new_info_text = document.createElement('p');
    new_info_text.classList.add('new_info_text');
    for (let i = 0; i < search_list.children.length; i++) {
        if (search_list.children[i] === li) {
            new_name.textContent = cards_info[i]['name'] + ' ' + cards_info[i]['_id'];

            if(cards_info[i]['room_type'] === 0){
                if(cards_info[i]['information'] !== null)
                    new_info_text.textContent = cards_info[i]['information'];
            }
            if(cards_info[i]['room_type'] === 3){
                if(cards_info[i]['address'] !== null)
                    new_info_text.textContent = cards_info[i]['address'];
            }
        }
    }
    block_info__text.appendChild(new_info_text);
    block_name.appendChild(new_name);
}

function collapse() {
    search_list_block.classList.remove('hidden');
    background_color_blue.classList.add('hidden');
    background_color_grey.classList.add('hidden');
    block_info.classList.add('hidden');
    block_name.firstChild.remove();
    if(block_info__text.children.length){
        block_info__text.firstChild.remove();
    }
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
}

function clear_search_input() {
    clear_list();
    input_text.value = '';
}
