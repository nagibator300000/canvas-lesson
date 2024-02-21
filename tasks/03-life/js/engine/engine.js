import generateArray from '../../../../utils';

export default class Engine {
  /** @type {number | null} Timestamp of a moment when the render started */
  startTime = null;

  /** @type {number | null } Id that must be used to cancel pending animation */
  requestId = null;

  /**
   * @param {MouseEvent} event
   */
  onClick = (event) => {
    const clickX = event.offsetX >= 0 ? event.offsetX : 0;
    const clickY = event.offsetY >= 0 ? event.offsetY : 0;
    const row = Math.floor(clickY / this.rowHeigh);
    const column = Math.floor(clickX / this.rowHeigh);
    this.grid[row][column] = this.grid[row][column] ? 0 : 1;
    this.render();
  };

  constructor(canvas, cycleLength = 500, scale = 10) {
    /** @type {HTMLCanvasElement} */
    this.canvas = canvas;
    /** @type {CanvasRenderingContext2D} */
    this.ctx = canvas.getContext('2d');
    this.cycleLength = cycleLength;
    this.scale = scale;
    this.ctx.strokeStyle = 'grey';
    this.ctx.fillStyle = 'white';
    this.colWid = null;
    this.rowHeigh = null;
    this.grid = this.generateGrid();
    this.render();
    this.initListeners();
  }

  setCellNum(value) {
    this.scale = value;
    this.clear();
    this.grid = this.generateGrid();
    this.render();
  }

  play() {
    this.loop();
  }

  pause() {
    cancelAnimationFrame(this.requestId);
  }

  clear() {
    this.grid = this.generateGrid();
    this.render();
  }

  save() {
    const save = JSON.stringify(this.grid);
    const link = document.createElement('a');
    link.download = 'Game of life';
    const blob = new Blob([save], { type: 'text/plain' });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async load(saveStr) {
    // eslint-disable-next-line no-eval
    const save = eval(saveStr);
    this.scale = save.length;
    this.grid = save;
    this.render();
    // eslint-disable-next-line no-console
    console.log(save);
    // eslint-disable-next-line no-console
    console.log(save.length);
    // eslint-disable-next-line no-console
    console.log(typeof save);
  }

  /** 1 Create an array */
  generateGrid() {
    return generateArray(this.scale).map(() =>
      generateArray(this.scale).map(() => 0),
    );
  }

  updateGrid() {
    const newGrid = this.generateGrid();
    this.grid.forEach((row, rowInd) => {
      row.forEach((cell, colInd) => {
        const neighbours = this.calculateNeighbours(rowInd, colInd);
        if (cell === 1) {
          newGrid[rowInd][colInd] =
            neighbours === 3 || neighbours === 2 ? 1 : 0;
        } else {
          newGrid[rowInd][colInd] = neighbours === 3 ? 1 : 0;
        }
      });
    });
    this.grid = newGrid;
  }

  getFromTo(ind) {
    const from = ind === 0 ? 0 : ind - 1;
    const to = ind === this.scale - 1 ? this.scale - 1 : ind + 1;
    return [from, to];
  }

  calculateNeighbours(row, col) {
    let neighbours = 0;
    const [fromX, toX] = this.getFromTo(row);
    const [fromY, toY] = this.getFromTo(col);
    for (let rowInd = fromX; rowInd <= toX; rowInd += 1) {
      for (let colInd = fromY; colInd <= toY; colInd += 1) {
        if (colInd !== col || rowInd !== row) {
          neighbours += this.grid[rowInd][colInd];
        }
      }
    }
    return neighbours;
  }

  /** 2 Render the grid */
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    const colLength = this.grid[0].length;
    this.colWid = this.canvas.width / colLength;
    const rowLength = this.grid.length;
    this.rowHeigh = this.canvas.height / rowLength;

    this.grid.forEach((row, rowInd) => {
      row.forEach((cell, colInd) => {
        const x = colInd * this.colWid;
        const y = rowInd * this.rowHeigh;
        if (cell) {
          this.ctx.fillRect(x, y, this.colWid, this.rowHeigh);
        }
      });

      for (let i = 1; i < colLength; i += 1) {
        this.ctx.moveTo(this.colWid * i, 0);
        this.ctx.lineTo(this.colWid * i, this.canvas.height);
      }

      for (let i = 1; i < rowLength; i += 1) {
        this.ctx.moveTo(0, this.rowHeigh * i);
        this.ctx.lineTo(this.canvas.height, this.rowHeigh * i);
      }

      this.ctx.stroke();
    });
  }

  /**
   *
   * @param {number} currentTime Timestamp of a moment when this function was called
   */
  loop = (currentTime = null) => {
    this.requestId = requestAnimationFrame(this.loop);
    if (!currentTime || currentTime < this.cycleLength + this.startTime) return;
    this.startTime = currentTime;
    this.updateGrid();
    this.render();
  };

  initListeners() {
    this.canvas.addEventListener('click', this.onClick);
  }
}
