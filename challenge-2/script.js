class Game {
    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.grid = this.createEmptyGrid();
        this.isRunning = false;
    }

    createEmptyGrid() {
        return Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    }

    randomize() {
        this.grid = this.grid.map(row => 
            row.map(() => Math.random() > 0.85)
        );
    }

    drawGliderGun() {
        const metrix = [
            [26, 1],
            [24, 2], [26, 2],
            [14, 3], [15, 3], [22, 3], [23, 3], [36, 3], [37, 3],
            [13, 4], [17, 4], [22, 4], [23, 4], [36, 4], [37, 4],
            [2, 5], [3, 5], [12, 5], [18, 5], [22, 5], [23, 5],
            [2, 6], [3, 6], [12, 6], [16, 6], [18, 6], [19, 6], [24, 6], [26, 6],
            [12, 7], [18, 7], [26, 7],
            [13, 8], [17, 8],
            [14, 9], [15, 9]
        ]

        metrix.forEach(([x, y]) => {
            this.grid[y][x] = true;
        });
    }

    drawPulsar() {

    }

    drawPentaDecathlon() {

    }

    countNeighbors(x, y) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const nx = (x + dx + this.cols) % this.cols;
                const ny = (y + dy + this.rows) % this.rows;
                if (this.grid[ny][nx]) count++;
            }
        }
        return count;
    }

    update() {
        const newGrid = this.createEmptyGrid();
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const neighbors = this.countNeighbors(x, y);
                const isAlive = this.grid[y][x];
                newGrid[y][x] = (isAlive && (neighbors === 2 || neighbors === 3)) ||
                              (!isAlive && neighbors === 3);
            }
        }
        this.grid = newGrid;
    }
}

class Renderer {
    constructor(canvas, game) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.game = game;
        canvas.width = game.cols * game.cellSize;
        canvas.height = game.rows * game.cellSize;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let y = 0; y < this.game.rows; y++) {
            for (let x = 0; x < this.game.cols; x++) {
                if (this.game.grid[y][x]) {
                    this.ctx.fillStyle = '#9440f3';
                    this.ctx.fillRect(
                        x * this.game.cellSize,
                        y * this.game.cellSize,
                        this.game.cellSize - 1,
                        this.game.cellSize - 1
                    );
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(124, 280, 5);
    const canvas = document.getElementById('gridCanvas');
    const renderer = new Renderer(canvas, game);
    let intervalId = null;

    document.getElementById('startBtn').addEventListener('click', () => {
        game.isRunning = !game.isRunning;
        document.getElementById('startBtn').textContent = 
            game.isRunning ? 'Stop' : 'Start';
        if (game.isRunning) {
            intervalId = setInterval(() => {
                game.update();
                renderer.draw();
            }, 1);
        } else {
            clearInterval(intervalId);
        }
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        game.grid = game.createEmptyGrid();
        renderer.draw();
    });

    document.getElementById('randomBtn').addEventListener('click', () => {
        game.randomize();
        renderer.draw();
    });

    document.getElementById('gliderGunBtn').addEventListener('click', () => {
        game.drawGliderGun();
        renderer.draw();
    });

    document.getElementById('pulsarBtn').addEventListener('click', () => {
        game.drawPulsar();
        renderer.draw();
    });

    document.getElementById('pentaDecathlonBtn').addEventListener('click', () => {
        game.drawGosperGliderGun();
        renderer.draw();
    });

    // Initial Draw
    renderer.draw();
});