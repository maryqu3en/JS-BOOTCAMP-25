# Conway's Game of Life Challenge 

## Introduction

The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead. Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.

This project implements Conway's Game of Life, including predefined patterns such as the **Glider Gun**, **Pulsar**, and **Pentadecathlon**. It allows users to interact with the game by starting, stopping, clearing, randomizing, and drawing patterns on the grid.

## Code Overview

### **Game Class**:
- **Grid Creation**: The game initializes with a grid of cells, all dead by default.
- **Pattern Drawing**: It supports predefined patterns like Glider Gun, Pulsar, and Pentadecathlon.
- **Game Logic**: Each cell's state (alive or dead) is determined by its neighbors in the previous generation.
- **Randomization**: Cells can be randomized based on a certain probability.

### **Renderer Class**:
- **Rendering the Grid**: The `Renderer` class handles the visual representation of the grid on an HTML canvas. It uses the 2D drawing context to fill in alive cells with a specific color.
  
## Features

### 1. **Predefined Patterns**:
   - **Glider Gun**: A well-known pattern that creates gliders (small moving patterns).
   - **Pulsar**: A periodic oscillator pattern.
   - **Pentadecathlon**: A stable oscillator with a period of 15.

### 2. **Controls**:
   - **Start/Stop Button**: Toggles between starting and stopping the game.
   - **Clear Button**: Clears the grid and resets all cells to dead.
   - **Random Button**: Randomizes the grid, turning some cells alive.
   - **Glider Gun Button**: Draws the Glider Gun on the grid.
   - **Pulsar Button**: Draws the Pulsar pattern.
   - **Pentadecathlon Button**: Draws the Pentadecathlon pattern.
   - **Speed Slider**: Controls the speed of the game by adjusting the interval between generations.

## Code Breakdown

### **Game Class**:

```javascript
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
        const offsetX = Math.floor(this.cols / 2) - 7;
        const offsetY = Math.floor(this.rows / 2) - 7;

        metrix.forEach(([x, y]) => {
            this.grid[y + offsetY][x + offsetX] = true;
        });
    }
    
    // Other pattern methods like drawPulsar and drawPentaDecathlon are similar
}
```

#### Key Methods:
- **createEmptyGrid()**: Initializes a 2D array representing the grid, where each cell is initially dead (`false`).
- **randomize()**: Randomly turns some cells alive with a probability of 15%.
- **drawGliderGun()**: Draws the Glider Gun pattern on the grid by setting specific coordinates to `true`.
  
### **Renderer Class**:

```javascript
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
```

#### Key Methods:
- **draw()**: Iterates through the grid and draws each live cell as a filled rectangle on the canvas.

### **Game Controls**:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(130, 250, 5);
    const canvas = document.getElementById('gridCanvas');
    const renderer = new Renderer(canvas, game);
    let intervalId = null;
    let speed = 100;

    // Event listeners for the buttons and slider
    document.getElementById('speedSlider').addEventListener('input', (event) => {
        speed = parseInt(event.target.value);
        if (game.isRunning) {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                game.update();
                renderer.draw();
            }, speed);
        }
    });

    document.getElementById('startBtn').addEventListener('click', () => {
        game.isRunning = !game.isRunning;
        document.getElementById('startBtn').textContent = 
            game.isRunning ? 'Stop' : 'Start';
        if (game.isRunning) {
            intervalId = setInterval(() => {
                game.update();
                renderer.draw();
            }, speed);
        } else {
            clearInterval(intervalId);
        }
    });

    // Additional button event listeners for clearing, randomizing, and loading patterns
});
```

#### Key Features:
- **Start/Stop Button**: Starts or stops the game based on the `isRunning` state.
- **Speed Slider**: Adjusts the speed of the game by modifying the interval used in `setInterval()`.
  
## Conclusion

This implementation of Conway's Game of Life includes predefined patterns, customizable speed, and user controls for interaction. It offers an interactive and visual representation of the cellular automaton's behavior, making it easy to experiment with different initial states and see how the system evolves.

## Usage Instructions

1. **Start the Game**: Press the **Start** button to begin or stop the game.
2. **Adjust Speed**: Use the **Speed Slider** to control the speed of updates.
3. **Clear the Grid**: Press the **Clear** button to reset all cells to dead.
4. **Randomize the Grid**: Press the **Random** button to randomly fill cells with alive or dead states.
5. **Draw Patterns**: Use the respective buttons (**Glider Gun**, **Pulsar**, **Pentadecathlon**) to draw those patterns on the grid.

Enjoy exploring the fascinating world of cellular automata!