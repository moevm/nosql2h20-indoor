

function zoom_button(direction) {
    let coef = 20*direction;
    minX -= coef/2;
    minY -= coef/2;
    maxX += coef;
    maxY += coef;
    change_viewBox(map, minX, minY, maxX, maxY)
}
