function create_line(id, coords1, coords2, stroke, width) {
    let newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('id',id);
    newLine.setAttribute('x1',coords1[0]);
    newLine.setAttribute('y1',coords1[1]);
    newLine.setAttribute('x2',coords2[0]);
    newLine.setAttribute('y2',coords2[1]);
    newLine.setAttribute("stroke", stroke);
    newLine.setAttribute("stroke-width", width);
    newLine.classList.add('svg-element');
    return newLine;
}

function create_stairs(id, coords, size, type) {
    let stairs = document.createElementNS('http://www.w3.org/2000/svg','image');
    stairs.setAttribute('id', id);
    stairs.setAttribute('x',`${coords[0] - size / 2}`);
    stairs.setAttribute('y',`${coords[1] - size / 2}`);
    stairs.setAttribute('width', size);
    stairs.setAttribute('height', size);
    stairs.setAttribute('href', `images/stairs-${type}.svg`);
    stairs.classList.add('svg-element');
    return stairs;
}

function change_viewBox(svg, minX, minY, maxX, maxY) {
    svg.setAttribute("viewBox", `${minX} ${minY} ${maxX} ${maxY}`);
}

function update_swg(svg, walls, floor, path = null) {
    svg.innerHTML = '';
    let i = 0;
    walls.forEach(function (t) {
        let width = 6;
        let stroke = 'black';
        t.walls.forEach(wall => {
            svg.append(create_line(i, [wall.coords_start_x, wall.coords_start_y],
                [wall.coords_end_x, wall.coords_end_y], stroke, width));
            i++;
        });
    });
    if (path !== null) {
        const img_size = 20;
        path.forEach(function (p, index) {
            if (!path[index + 1]) return;
            let dest = path[index + 1];
            let stroke = 'red';
            let width = 2;
            if (p[0] === floor && dest[0] === floor) {
                svg.append(create_line(i, p.slice(-2), dest.slice(-2), stroke, width));
                i++;
            } else if (p[0] === floor && p[0] > dest[0]) {
                // stairs down
                svg.append(create_stairs(i, p.slice(-2), img_size, 'down'));
                i++;
            } else if (p[0] === floor && p[0] < dest[0]) {
                // stairs up
                svg.append(create_stairs(i, p.slice(-2), img_size, 'up'));
                i++;
            }
        });
    }
}
