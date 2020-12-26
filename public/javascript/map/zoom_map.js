function zoom_map(zoom_speed) {
    if (sizeX + zoom_speed <= 0 || sizeY + zoom_speed <= 0)
        return;
    minX -= zoom_speed / 2;
    minY -= zoom_speed / 2;
    sizeX += zoom_speed;
    sizeY += zoom_speed;
    change_viewBox(map, minX, minY, sizeX, sizeY);
}