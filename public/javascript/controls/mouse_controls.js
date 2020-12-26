let is_mouse_down = false;

function zoom_scroll(event) {
    event.preventDefault();
    let zoom_speed = event.deltaY * 0.5;
    zoom_map(zoom_speed);
}

function mouse_down(event) {
    event.preventDefault();
    is_mouse_down = true;
}

function mouse_up(event) {
    is_mouse_down = false;
}

function mouse_drag(event) {
    if (is_mouse_down) {
        let move_speed = sizeX / 1000;
        minX -= event.movementX * move_speed;
        minY -= event.movementY * move_speed;

        change_viewBox(map, minX, minY, sizeX, sizeY);
    }

}


