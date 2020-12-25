let is_mouse_down = false;

function zoom(event) {
    event.preventDefault();
    let coef = 0.5;
    minX -= (event.deltaY * coef)/2;
    minY -= (event.deltaY * coef)/2;
    maxX += event.deltaY * coef;
    maxY += event.deltaY * coef;
    change_viewBox(map, minX, minY, maxX, maxY)
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
        let move_coef = maxX / 1000;
        minX -= event.movementX * move_coef;
        minY -= event.movementY * move_coef;

        change_viewBox(map, minX, minY, maxX, maxY);
    }

}


