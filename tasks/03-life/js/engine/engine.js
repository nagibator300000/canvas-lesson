export default class Engine {
  /** @type {number | null} Timestamp of a moment when the started */
  startTime = null;

  /** @type {number | null } Id that must be used to cancel pending animation */
  requestId = null;

  /**
   * @param {MouseEvent} event
   */
  // onClick = (event) => {};

  constructor(canvas, cycleLength = 500, scale = 10) {
    /** @type {HTMLCanvasElement} */
    this.canvas = canvas;
    /** @type {CanvasRenderingContext2D} */
    this.ctx = canvas.getContext('2d');
    this.cycleLength = cycleLength;
    this.scale = scale;

    this.generateGrid();
    this.render();
    this.initListeners();
  }

  // setCellNum(value) {}

  // play() {}

  // pause() {}

  // clear() {}

  /** 1 Create an array */
  generateGrid() {}

  // updateGrid() {}

  // calculateNeighbours(row, col) {}

  /** 2 Render the grid */
  render() {}

  /**
   *
   * @param {number} currentTime Timestamp of a moment when this function was called
   */
  // loop = (currentTime = null) => {};

  initListeners() {
    this.canvas.addEventListener('click', this.onClick);
  }
}
