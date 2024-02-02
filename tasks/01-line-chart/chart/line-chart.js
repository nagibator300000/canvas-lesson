import AxisX from './axis-x';
import AxisY from './axis-y';

class LineChart {
  constructor(canvas, { axisXSettings = {}, axisYSettings = {} } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.axisX = new AxisX(canvas, axisXSettings);
    this.axisY = new AxisY(canvas, axisYSettings);
  }

  render() {
    const deltaX = this.axisX.zeroPos;
    const deltaY = this.axisY.zeroPos;

    this.ctx.save();
    this.ctx.translate(0, deltaY);
    this.axisX.render();
    this.ctx.restore();

    this.ctx.save();
    this.ctx.translate(deltaX, 0);
    this.axisY.render();
    this.ctx.restore();
  }

  /**
   * @typedef {{
   *  color?: string,
   *  width?: number,
   *  cap?: "butt" | "round" | "square",
   *  join?: "round" | "bevel" | "meter"
   * }} LineSettings
   */

  /**
   * @typedef {{x: number, y: number}} Point
   * @param {Point[]?} data
   * @param {LineSettings?} lineSettings
   * @returns this
   */
  plot(data = [], lineSettings = {}) {
    return this;
  }

  /**
   * @typedef {{x: number, y: number}} Point
   * @param {Point[]} data
   * @returns {Point[]}
   */
  rescaleData(data = []) {}

  /**
   * @param {LineSettings?} lineSettings
   */
  applyLineSettings({ color = '', width = 1, cap = '', join = '' } = {}) {}
}

export default LineChart;
