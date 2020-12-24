function create_line(id, coords1, coords2, stroke, width) {
    let newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('id',id);
    newLine.setAttribute('x1',coords1[0]);
    newLine.setAttribute('y1',coords1[1]);
    newLine.setAttribute('x2',coords2[0]);
    newLine.setAttribute('y2',coords2[1]);
    newLine.setAttribute("stroke", stroke);
    newLine.setAttribute("stroke-width", width);
    return newLine;
}

function create_stairs(id, coords, size, type) {
    let stairs = document.createElementNS('http://www.w3.org/2000/svg','image');
    stairs.setAttribute('id', id);
    stairs.setAttribute('x',`${coords[0] - size / 2}`);
    stairs.setAttribute('y',`${coords[1] - size / 2}`);
    stairs.setAttribute("width", size);
    stairs.setAttribute("height", size);
    stairs.setAttribute("href", `images/stairs-${type}.svg`)
    return stairs;
}

function update_swg(svg, walls, floor, path = null) {
    svg.innerHTML = "";
    let i = 0;
    walls.forEach(function (t) {
        let width = 4 - t.room_type;
        let stroke = "black";
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
            let stroke = "red";
            let width = 2;
            if (p[0] === floor && dest[0] === floor) {
                svg.append(create_line(i, p.slice(-2), dest.slice(-2), stroke, width));
                i++;
            } else if (p[0] === floor && p[0] > dest[0]) {
                // stairs down
                svg.append(create_stairs(i, p.slice(-2), img_size, "down"));
                i++;
            } else if (p[0] === floor && p[0] < dest[0]) {
                // stairs up
                svg.append(create_stairs(i, p.slice(-2), img_size, "up"));
                i++;
            }
        });
    }
}

map = document.getElementById("map")

update_swg(map, JSON.parse(`[{"room_type":0,"walls":[{"coords_start_x":0,"coords_start_y":400,"coords_end_x":0,"coords_end_y":900},{"coords_start_x":0,"coords_start_y":900,"coords_end_x":250,"coords_end_y":900},{"coords_start_x":250,"coords_start_y":900,"coords_end_x":250,"coords_end_y":400},{"coords_start_x":250,"coords_start_y":400,"coords_end_x":0,"coords_end_y":400},{"coords_start_x":250,"coords_start_y":400,"coords_end_x":250,"coords_end_y":900},{"coords_start_x":250,"coords_start_y":900,"coords_end_x":500,"coords_end_y":900},{"coords_start_x":500,"coords_start_y":900,"coords_end_x":500,"coords_end_y":400},{"coords_start_x":500,"coords_start_y":400,"coords_end_x":250,"coords_end_y":400},{"coords_start_x":0,"coords_start_y":0,"coords_end_x":0,"coords_end_y":300},{"coords_start_x":0,"coords_start_y":300,"coords_end_x":250,"coords_end_y":300},{"coords_start_x":250,"coords_start_y":300,"coords_end_x":250,"coords_end_y":0},{"coords_start_x":250,"coords_start_y":0,"coords_end_x":0,"coords_end_y":0},{"coords_start_x":250,"coords_start_y":0,"coords_end_x":250,"coords_end_y":300},{"coords_start_x":250,"coords_start_y":300,"coords_end_x":500,"coords_end_y":300},{"coords_start_x":500,"coords_start_y":300,"coords_end_x":500,"coords_end_y":0},{"coords_start_x":500,"coords_start_y":0,"coords_end_x":250,"coords_end_y":0},{"coords_start_x":700,"coords_start_y":400,"coords_end_x":700,"coords_end_y":900},{"coords_start_x":700,"coords_start_y":900,"coords_end_x":950,"coords_end_y":900},{"coords_start_x":950,"coords_start_y":900,"coords_end_x":950,"coords_end_y":400},{"coords_start_x":950,"coords_start_y":400,"coords_end_x":700,"coords_end_y":400},{"coords_start_x":950,"coords_start_y":400,"coords_end_x":950,"coords_end_y":900},{"coords_start_x":950,"coords_start_y":900,"coords_end_x":1200,"coords_end_y":900},{"coords_start_x":1200,"coords_start_y":900,"coords_end_x":1200,"coords_end_y":400},{"coords_start_x":1200,"coords_start_y":400,"coords_end_x":950,"coords_end_y":400},{"coords_start_x":700,"coords_start_y":0,"coords_end_x":700,"coords_end_y":300},{"coords_start_x":700,"coords_start_y":300,"coords_end_x":900,"coords_end_y":300},{"coords_start_x":900,"coords_start_y":300,"coords_end_x":900,"coords_end_y":0},{"coords_start_x":900,"coords_start_y":0,"coords_end_x":700,"coords_end_y":0},{"coords_start_x":900,"coords_start_y":0,"coords_end_x":900,"coords_end_y":300},{"coords_start_x":900,"coords_start_y":300,"coords_end_x":1200,"coords_end_y":300},{"coords_start_x":1200,"coords_start_y":300,"coords_end_x":1200,"coords_end_y":0},{"coords_start_x":1200,"coords_start_y":0,"coords_end_x":900,"coords_end_y":0},{"coords_start_x":2000,"coords_start_y":400,"coords_end_x":2000,"coords_end_y":700},{"coords_start_x":2000,"coords_start_y":700,"coords_end_x":2250,"coords_end_y":700},{"coords_start_x":2250,"coords_start_y":700,"coords_end_x":2250,"coords_end_y":400},{"coords_start_x":2250,"coords_start_y":400,"coords_end_x":2000,"coords_end_y":400},{"coords_start_x":2250,"coords_start_y":400,"coords_end_x":2250,"coords_end_y":700},{"coords_start_x":2250,"coords_start_y":700,"coords_end_x":2500,"coords_end_y":700},{"coords_start_x":2500,"coords_start_y":700,"coords_end_x":2500,"coords_end_y":400},{"coords_start_x":2500,"coords_start_y":400,"coords_end_x":2250,"coords_end_y":400},{"coords_start_x":2500,"coords_start_y":400,"coords_end_x":2500,"coords_end_y":700},{"coords_start_x":2500,"coords_start_y":700,"coords_end_x":2750,"coords_end_y":700},{"coords_start_x":2750,"coords_start_y":700,"coords_end_x":2750,"coords_end_y":400},{"coords_start_x":2750,"coords_start_y":400,"coords_end_x":2500,"coords_end_y":400},{"coords_start_x":2750,"coords_start_y":0,"coords_end_x":2750,"coords_end_y":700},{"coords_start_x":2750,"coords_start_y":700,"coords_end_x":3100,"coords_end_y":700},{"coords_start_x":3100,"coords_start_y":700,"coords_end_x":3100,"coords_end_y":0},{"coords_start_x":3100,"coords_start_y":0,"coords_end_x":2750,"coords_end_y":0},{"coords_start_x":2000,"coords_start_y":0,"coords_end_x":2000,"coords_end_y":300},{"coords_start_x":2000,"coords_start_y":300,"coords_end_x":2300,"coords_end_y":300},{"coords_start_x":2300,"coords_start_y":300,"coords_end_x":2300,"coords_end_y":0},{"coords_start_x":2300,"coords_start_y":0,"coords_end_x":2000,"coords_end_y":0},{"coords_start_x":2300,"coords_start_y":0,"coords_end_x":2300,"coords_end_y":300},{"coords_start_x":2300,"coords_start_y":300,"coords_end_x":2600,"coords_end_y":300},{"coords_start_x":2600,"coords_start_y":300,"coords_end_x":2600,"coords_end_y":0},{"coords_start_x":2600,"coords_start_y":0,"coords_end_x":2300,"coords_end_y":0}]},{"room_type":2,"walls":[{"coords_start_x":0,"coords_start_y":0,"coords_end_x":0,"coords_end_y":900},{"coords_start_x":0,"coords_start_y":900,"coords_end_x":1200,"coords_end_y":900},{"coords_start_x":1200,"coords_start_y":900,"coords_end_x":1200,"coords_end_y":0},{"coords_start_x":1200,"coords_start_y":0,"coords_end_x":0,"coords_end_y":0},{"coords_start_x":2000,"coords_start_y":0,"coords_end_x":2000,"coords_end_y":700},{"coords_start_x":2000,"coords_start_y":700,"coords_end_x":3100,"coords_end_y":700},{"coords_start_x":3100,"coords_start_y":700,"coords_end_x":3100,"coords_end_y":0},{"coords_start_x":3100,"coords_start_y":0,"coords_end_x":2000,"coords_end_y":0}]}]`), 1);
