let x = 50, y = 50;
let s = 15;
let field = [];
let offsets = [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1], [0, 1], [-1, 0], [1, 0]];
let bias = 2;
let root = document.getElementById("root");

class Block {

    constructor(_block, _live, _x, _y) {
        this.live = _live ? "white" : "black";
        this.x = _x;
        this.y = _y;
        this.block = _block;
        this.block.style.backgroundColor = this.live;
        this.block.style.position = "absolute";
        this.block.style.width = s + "px";
        this.block.style.height = s + "px";
        this.block.style.left = (bias + s / 2 + (s * this.x)) + "px";
        this.block.style.top = (bias + s / 2 + (s * this.y)) + "px";
        root.append(this.block);
    }

    step() {
        let near = 0;
        for (let i = 0; i < 8; i++) {
            let temp = 0;
            try {
                let temp_x = (this.x + offsets[i][0]) % x;
                let temp_y = (this.y + offsets[i][1]) % y;
                temp = field[temp_x][temp_y].block.style.backgroundColor === "black" ? 1 : 0;
            } catch (error) {
            }
            near += temp;
        }
        if (this.live === "white") {
            if (near === 3) {
                this.live = "black";
            }
        } else {
            if (near < 2 || near > 3) {
                this.live = "white";
            }
        }
    }

}


for (let i = 0; i < x; i++) {
    let line = [];
    for (let j = 0; j < y; j++) {
        line.push(new Block(document.createElement('button'), Math.round(3 * Math.random()), i, j));
    }
    field.push(line);
}

setInterval(() => {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            field[i][j].step();
        }
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            field[i][j].block.style.backgroundColor = field[i][j].live;
        }
    }
}, 100);
