import AxisX from './axis-x';
import AxisY from './axis-y';

class LineChart {
  constructor(canvas, { axisXSettings = {}, axisYSettings = {} } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.axisX = new AxisX(canvas, axisXSettings);
    this.axisY = new AxisY(canvas, axisYSettings);
    this.labelLengX =
      this.axisX.ofs / (axisXSettings.step ? axisXSettings.step : 1);
    this.labelLengY =
      -this.axisY.ofs / (axisYSettings.step ? axisYSettings.step : 1);
  }

  render() {
    this.ctx.save();
    this.ctx.translate(0, this.axisY.zeroPos);
    this.axisX.render();
    this.ctx.restore();
    this.ctx.save();
    this.ctx.translate(this.axisX.zeroPos, 0);
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
    const points = this.rescaleData(data);
    this.ctx.save();
    this.applyLineSettings(lineSettings);
    this.ctx.translate(this.axisX.zeroPos, this.axisY.zeroPos);
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    points.forEach((point) => {
      this.ctx.lineTo(point.x, point.y);
    });
    this.ctx.stroke();
    this.ctx.restore();
    return this;
  }

  /**
   * @typedef {{x: number, y: number}} Point
   * @param {Point[]} data
   * @returns {Point[]}
   */
  rescaleData(data = []) {
    return data.map((point) => ({
      x: point.x * this.labelLengX,
      y: point.y * this.labelLengY,
    }));
  }

  /**
   * @param {LineSettings?} lineSettings
   */
  applyLineSettings({ color = '', width = 1, cap = '', join = '' } = {}) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = cap;
    this.ctx.lineJoin = join;
  }
}

export default LineChart;
